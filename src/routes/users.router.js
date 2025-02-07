import { Router } from "express";
import UserControllers from "../controllers/users.controller.js";
import { passportCall }  from "../passport/passportCall.js"
import { isAdmin } from "../middlewares/isAdmin.js";
import { validateUserData, handleValidationErrors } from "../middlewares/validators.js";


const controller = new UserControllers;
const router= Router();

router.post("/register",validateUserData, handleValidationErrors, controller.register);

router.post("/login", controller.login);

router.post("/auth",  controller.verify);

router.get("/current", passportCall('current'), controller.profile)

router.get("/panelAdmin", passportCall('current'), isAdmin, controller.panelAdmin)

export default router;
