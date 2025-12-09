import dotenv from "dotenv"

import RefId from "../models/refIdModel.js"


dotenv.config()


export const completeRfp = async (req, res) => {
  try {
    const refid_update = await RefId.updateOne({ _id: req.body.id }, { $set: { is_open: false } })

    return res.status(200).json({ "message": "refId update Successful" })

  } catch (error) {
    return res.status(500).json({ "message": error.message })
  }
}


export const getRefIds = async (req, res) => {

  try {
    const ref_ids = await RefId.find({ is_open: true })
    res.status(200).json(ref_ids);
  } catch (error) {
    res.status(500).json({ "message": error.message })

  }
}
