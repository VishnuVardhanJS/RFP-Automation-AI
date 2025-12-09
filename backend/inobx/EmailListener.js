
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import RefId from "../models/refIdModel.js";
import { rfqParse } from "./rfqProcessor.js";
import Quotations from "../models/quotationModel.js";
import Vendor from "../models/vendorModel.js"


const client = new ImapFlow({
  host: "imap.gmail.com",
  port: 993,
  secure: true,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  logger: {
    level: "silent"
  }
});

const regex = /RFQ-[0-9a-fA-F]{8}/;

async function processEmails(sequences) {
  if (!sequences || !Array.isArray(sequences) || sequences.length === 0) {
    return;
  }

  const openRefIds = await RefId.find({ is_open: true }).select("ref_id");
  const refIdSet = new Set(openRefIds.map(doc => doc.ref_id));

  for (let seq of sequences) {
    const { source } = await client.fetchOne(seq, { source: true });
    const parsed = await simpleParser(source);
    const match = parsed.text.match(regex);

    // console.log("REGEX MATCHER : ", match)
    if (match && refIdSet.has(match[0])) {

      let emailBody = parsed.text;

      if (!emailBody && parsed.html) {
        emailBody = parsed.html.replace(/<[^>]+>/g, ' ');
      }

      let quotationData = await rfqParse(emailBody)

      if (!quotationData.is_rfp) {
        continue;
      }

      console.log("Extracted Data from the mail")

      const senderEmail = parsed.from.value[0].address

      if (senderEmail == null) {
        continue;
      }

      const rfp_vendor = await Vendor.findOne({ vendor_email: senderEmail });

      if (!rfp_vendor) {
        continue
      }

      delete quotationData.is_rfp

      quotationData.rfp_id = match[0]

      // console.log(rfp_vendor)

      quotationData.vendor_name = rfp_vendor.vendor_name

      await Quotations.create(quotationData).catch(err => console.log(err))

      await client.messageFlagsAdd(seq, ['\\Seen']);

      console.log("Quotation Parsed and Added to Database")
    }
  }
}


async function startEmailListener() {
  await client.connect();
  console.log("Connected to IMAP server.");

  const mailbox = await client.mailboxOpen('INBOX');
  console.log("INBOX opened.");

  const unseen = await client.search({ seen: false }) || [];
  await processEmails(unseen);

  client.on('exists', async () => {
    try {
      const newUnseen = await client.search({ seen: false }) || [];
      await processEmails(newUnseen);
    } catch (err) {
      console.error("Error processing new emails:", err);
    }
  });

  setInterval(() => client.idle(), 5 * 60 * 1000);
}

startEmailListener().catch(console.error);

export default client;
