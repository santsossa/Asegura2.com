import { Router } from "express";
import ClientControllers from "../controllers/clients.controller.js";
import { passportCall }  from "../passport/passportCall.js"
import { isAdmin } from "../middlewares/isAdmin.js";


const controller = new ClientControllers
const router= Router();

router.get("/", passportCall('current'), controller.inicialData);

router.get("/status", passportCall('current'), controller.status);

router.get("/search", passportCall('current'), controller.search);

router.post("/generate-clients/:cant", passportCall('current'), isAdmin,  controller.mockUsers);

export default router;
