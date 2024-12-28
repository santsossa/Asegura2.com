import express, { json, urlencoded } from "express"
import compression from 'express-compression';  
import morgan from "morgan";
import "./passport/jwt.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { initMongoDB } from "./db/dbConfig.js";
import MainRouter from "./routes/index.js";
import dotenv from "dotenv";
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';
dotenv.config()
const mainRouter= new MainRouter();

const app = express();

const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));


app
  .use(json())
  .use(urlencoded({extended: true}))
  .use(morgan("dev"))
  .use(cookieParser())
  .use("/api", mainRouter.getRouter())
  .use(errorHandler)
  .use(compression({brotli: {enabled: true, zlib:{}}}));

initMongoDB()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

export default app