import { Router } from "express";
import userRouter from "./users.router.js";
import clientRouter from "./clients.router.js"

export default class MainRouter{
    constructor(){
        this.router= Router();
        this.init();
    }

    init(){
        this.router.use("/users", userRouter);
        this.router.use("/clients", clientRouter)
    }

    getRouter(){
        return this.router;
    }
}
