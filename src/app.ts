import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./app/route";
import globalErrorHandler from "./app/middlewares/globalErrorHandeler";
import cookieParser from "cookie-parser";
import ApiNotFound from "./app/middlewares/notFound";
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors({origin:['http://localhost:5173','https://car-shop-frontend-xi.vercel.app'], credentials:true}));
app.use(cookieParser())
app.use("/api", router)
app.get('/', (req: Request , res : Response ) => {
  res.send('Car shop is running!')
})
app.use(globalErrorHandler);
app.use(ApiNotFound);

export default app;