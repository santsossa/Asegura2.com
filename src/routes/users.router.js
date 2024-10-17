import { Router } from "express";
const router = Router();
import UserDao from "../DAO/user.dao.js";
const userDao = new UserDao();

router.post("/registro", async (req, res) => {
  try {
    const newUser = await userDao.register(req.body);
    if(newUser) res.redirect('/login');
    else res.redirect('/errorRegistro');
  } catch (error) {
    res.json({message: error.message})
  }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.login(email, password);
        if(user) {
            req.session.email = email;
            req.session.password = password;
            res.redirect('/perfil')
        } else res.redirect('/errorLogin');
    } catch (error) {
      res.json({message: error.message})
    }
});

export default router;
