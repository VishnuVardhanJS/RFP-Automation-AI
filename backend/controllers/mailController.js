import geminiAI from "../gemini/geminiConfig.js"
import nodemailer from "nodemailer"
import RefId from "../models/refIdModel.js"
import dotenv from "dotenv"

dotenv.config()


export const sendMail = async (req, res) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const geminiData = await getMailContent(req.body.my_company_name, req.body.vendor_name,
      req.body.query_data, req.body.about_company, req.body.ref_id)

    if (!geminiData) {
      return res.status(400).json({ "message": "email not sent" })
    }

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: req.body.vendor_email,
      subject: geminiData.subject,
      html: geminiData.body,
    };

    await transporter.sendMail(mailOptions);

    try {
      await RefId.create({ "ref_id": req.body.ref_id, "rfs_query": req.body.query_data });
    } catch (error) {

      return res.status(400).json({ "message": error.message })

    }

    return res.status(200).json({ "message": "mail sent successfully" });

  } catch (error) {
    console.error("MAIL ERROR:", error);
    return res.status(400).json({ "message": error });
  }
}

const getMailContent = async (my_company_name, company_name, query_data, about_company, ref_id) => {
  const aiData = await geminiAI.models.generateContent({
    model: "gemini-2.5-flash",
    generationConfig: {
      response_mime_type: "application/json",
      response_schema: {
        type: "object",
        properties: {
          subject: { type: "string" },
          body: { type: "string" }
        },
        required: ["subject", "body"]
      }
    },
    contents: `
        write a professional email to ${company_name} for RFP with the 
        context: ${query_data}
        
        My Company name: ${my_company_name}.

        About my Company: ${about_company}

        No placeholders. No introductory phrases. No filler words.

        Return output strictly in JSON with:
        {
          "subject": "...",
          "body": "..."
        }
        give the body in html mail format which i can directly send to mail,
        add html tables for the products if necessary
        This Should be a Formal Mail
        Ask them to inclued this ${ref_id} somewhere in their reply mail at the end and this is important
        Add about my company before asking the products or services
      `,
  })

  if (!aiData) {
    return false
  }

  let output = aiData.text
  output = output.replace(/```json|```/g, "").trim();

  return JSON.parse(output);
}
