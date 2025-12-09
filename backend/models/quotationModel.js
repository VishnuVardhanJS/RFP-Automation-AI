import mongoose from "mongoose";

const QuotationSchema = new mongoose.Schema({
  rfp_id: {
    type: String,
    required: true
  },

  vendor_name: {
    type: String,
    ref: 'Vendor',
    required: true,
  },

  quotation: {
    type: Map,
    of: Number,
    required: true
  }
});


const Quotations = mongoose.model("Quotations", QuotationSchema)

export default Quotations
