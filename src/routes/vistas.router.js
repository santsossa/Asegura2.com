import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.send("login");
});

router.get("/registro", (req, res) => {
  res.send("hola");
});

router.get("/errorRegistro", (req, res) => {
  res.send('error en registro')
});

router.get("/errorLogin", (req, res) => {
  res.send("errorLogin");
});

router.get("/perfil", (req, res) => {
  res.send("perfil");
  console.log(req.session);
});

export default router;