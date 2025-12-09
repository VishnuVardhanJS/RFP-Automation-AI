import mongoose from "mongoose";


const vendorSchema = new mongoose.Schema({

  vendor_name: { type: String, required: true },
  vendor_email: { type: String, required: true, unique: true },
})


const Vendor = mongoose.model("Vendor", vendorSchema)


export default Vendor
