import geminiAI from "../gemini/geminiConfig.js";

export async function rfqParse(mail_body) {
  const aiData = await geminiAI.models.generateContent({
    model: "gemini-2.5-flash",
    generationConfig: {
      response_mime_type: "application/json",
      response_schema: {
        type: "object",
        properties: {
          is_rfp: {
            type: "boolean",
            description: "Check if the given data is Rfp or not"
          },
          quotation: {
            type: "object",
            description: "Map of product names to their prices",
            additionalProperties: { type: "number" }
          }
        },
        required: ["is_rfp", "quotation"]
      }
    },
    contents: `
        Input data : ${mail_body}

        Extract the given data and check if products and prices are given, if no data is related to products and their respective prices set is_rfp to false and empty json object in quotation

        Extract and products and its respective prices from the given data and give output accordingly

        Add the price only in number remove all the currency symbols

        Get the unit price for every product if the price is given for the multiple quanity convert it for single quantity

        No placeholders. No introductory phrases. No filler words.

        Return output strictly in JSON with:
        {
          "is_rfp": true/false,
          "quotation": {product1: product1price, product2: product2price, ...... }
        }

        The product Price should Strictly be in Number Data Type
      `,
  })

  if (!aiData) {
    return { "is_rfp": false, "quotation": {} }
  }

  let output = aiData.text
  output = output.replace(/```json|```/g, "").trim();

  return JSON.parse(output)
}


// function rfqParseAttachment(rfp_id, vendor_mail, mail_body, mail_attachments) {
//
// }
