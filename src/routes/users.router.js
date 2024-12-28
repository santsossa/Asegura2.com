import { Router } from "express";
import UserControllers from "../controllers/users.controller.js";
import { passportCall }  from "../passport/passportCall.js"
import { isAdmin } from "../middlewares/isAdmin.js";
import { validateUserData, handleValidationErrors } from "../middlewares/validators.js";
import Auth from '../middlewares/auth.js';


const controller = new UserControllers;
const router= Router();
const auth = new Auth();


router.post("/register",validateUserData, handleValidationErrors, controller.register);

router.post("/login", controller.login);

router.get("/current", passportCall('current'), controller.profile)

export default router;
