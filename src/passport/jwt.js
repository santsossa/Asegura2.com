import passport from "passport";
import { Strategy as jwtStrategy } from "passport-jwt";
import Auth from "../middlewares/auth.js";
import UserService from "../services/user.services.js";

const auth= new Auth();
const userService= new UserService();

passport.use("current", new jwtStrategy(auth.strategyConfigCookies, auth.verifyToken));

passport.serializeUser((user, done)=>{
    try{
        done(null, user.userId);
    }catch(error){
    return done(error)
    }
});

passport.deserializeUser(async(id,done)=>{
    try{
        const user = await userService.getById(id);
        return done(null, user);
    }catch(error){
        return done(error);
    }
});