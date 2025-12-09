import { getQuotationsbyRefId } from "../controllers/quotationController.js";
import express from "express"


const QuotationsRouter = express.Router()


QuotationsRouter.get("/:id", getQuotationsbyRefId)

export default QuotationsRouter
