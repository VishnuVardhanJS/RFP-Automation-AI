import express from "express"
import { sendMail } from "../controllers/mailController.js"


const mailRouter = express.Router()



mailRouter.post("/", sendMail)



export default mailRouter
