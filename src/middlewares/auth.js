import "dotenv/config";
import jwt from "jsonwebtoken"
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";

const SECRET_KEY= process.env.SECRET_KEY

export default class Auth{
 
    generateToken(user, time='5m'){
        const playload={
            userId: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }
        return jwt.sign(playload, SECRET_KEY, { expiresIn: time })
    }

    async verifyToken(jwt_playload, done){
        if(!jwt_playload) return done(null, false, {message: "user not found"})
        return done(null, jwt_playload)
    }

    cookieStractor= (req)=>{
        const token = req.cookies.token
        console.log("cookie---->", token);
        return token;
    }

    strategyConfigCookies={
        jwtFromRequest: ExtractJwt.fromExtractors([this.cookieStractor]),
        secretOrKey: SECRET_KEY,
    };
};

