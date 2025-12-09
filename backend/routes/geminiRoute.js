import express from "express"
import { getRfsMail } from "../controllers/geminiController.js"


const geminiRouter = express.Router()

geminiRouter.post("/", getRfsMail)


export default geminiRouter
