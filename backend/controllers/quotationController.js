import Quotations from "../models/quotationModel.js"

export const getQuotationsbyRefId = async (req, res) => {
  try {
    const quotations = await Quotations.find({ "rfp_id": req.params.id })
    return res.status(200).json(quotations)

  } catch (error) {
    return res.status(500).json({ "message": error.message })
  }
}
