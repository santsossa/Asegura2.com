import { Router } from "express";
import userRouter from "./users.router.js";

export default class MainRouter{
    constructor(){
        this.router= Router();
        this.init();
    }

    init(){
        this.router.use("/users", userRouter);
    }

    getRouter(){
        return this.router;
    }
}
