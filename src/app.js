import express, { urlencoded } from "express"
import path from "path"
import mongoose from "mongoose";
import multer from "multer";
import methodOverride from "method-override";
import session from "express-session";
import cookieParser from "cookie-parser";
import { initMongoDB } from "./db/dbConfig.js";
import MongoStore from "connect-mongo";
import userRouter from "./routes/users.router.js";
import viewsRouter from "./routes/vistas.router.js";


import dotenv from "dotenv";
dotenv.config()
const app = express();


const sessionConfig = {
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
    store: new MongoStore({
      mongoUrl:
        process.env.MONGO_URI,
      ttl: 60,
    }),
  };


app.use(session(sessionConfig))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use("/users", userRouter);
app.use("/", viewsRouter)

initMongoDB()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));


export default app