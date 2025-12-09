import Vendor from "../models/vendorModel.js"

export const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);

  } catch (error) {

    res.status(400).json({ "message": error.message })

  }

}

export const getAllVendors = async (req, res) => {

  try {
    const vendors = await Vendor.find()
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ "message": error.message })

  }
}


export const getVendorbyId = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    return res.status(200).json(vendor)
  } catch (error) {

    return res.status(500).json({ "message": error.message })

  }
}

export const deleteVendorbyMail = async (req, res) => {
  try {

    const vendor_email = req.params.vendor_email
    const vendor = await Vendor.findOneAndDelete({ vendor_email: vendor_email })

    if (!vendor) {
      return res.status(500).json("Vendor Not Found")
    }
    return res.status(200).json("Vendor Deleted Successfully")

  } catch (error) {
    return res.status(500).json({ "message": error.message })
  }
}















