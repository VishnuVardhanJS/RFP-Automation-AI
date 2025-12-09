import express from "express"
import { completeRfp, getRefIds } from "../controllers/refIdController.js"

const RefIdRouter = express.Router()



RefIdRouter.patch("/", completeRfp)

RefIdRouter.get("/", getRefIds)


export default RefIdRouter
