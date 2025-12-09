import express from "express"
import cors from "cors"
import vendorRouter from "./routes/vendorRoute.js"
import geminiRouter from "./routes/geminiRoute.js"
import mailRouter from "./routes/mailRoute.js"
import "./inobx/EmailListener.js"
import RefIdRouter from "./routes/refIdRoute.js"
import QuotationsRouter from "./routes/quotationsRoute.js"

const app = express()


app.use(cors())
app.use(express.json())


app.use("/vendor", vendorRouter)

app.use("/gemini", geminiRouter)

app.use("/mail", mailRouter)

app.use("/refid", RefIdRouter)

app.use("/quotations", QuotationsRouter)


export default app


