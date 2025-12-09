import express from "express"

import { createVendor, deleteVendorbyMail, getAllVendors, getVendorbyId } from "../controllers/vendorController.js"


const vendorRouter = express.Router()


vendorRouter.post("/", createVendor)

vendorRouter.get("/:id", getVendorbyId)

vendorRouter.get("/", getAllVendors)

vendorRouter.delete("/:vendor_email", deleteVendorbyMail)

export default vendorRouter
