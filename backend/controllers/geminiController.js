import geminiAI from "../gemini/geminiConfig.js"

export const getRfsMail = async (req, res) => {
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
        write a professional email to ${req.body.company_name} for RFP with the 
        context: ${req.body.query_data}
        
        My Company name: ${req.body.my_company_name}.

        No placeholders. No introductory phrases. No filler words.

        Return output strictly in JSON with:
        {
          "subject": "...",
          "body": "..."
        }
        give the body in html mail format which i can directly send to mail,
        add html tables for the products
        it should list the products and repective budget as given
      `,
  })

  if (!aiData) {
    return res.status(400).json({ "message": "AI API ERROR" })
  }

  let output = aiData.text
  output = output.replace(/```json|```/g, "").trim();

  return res.status(200).json(JSON.parse(output));
}
