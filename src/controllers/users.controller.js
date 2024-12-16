import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";

const userService= new UserService();

export default class UserControllers extends Controllers{
    constructor(){
        super(userService);
    }

    register = async(req, res, next) =>{
        try {
          const data = await this.service.register(req.body);
          !data ? createResponse(req, res, 404, data) : createResponse(req, res, 200, data);
        } catch (error) {
          next(error);
        }
      };
    

      login = async (req, res, next) => {
        try {
            const login = await this.service.login(req.body);
            if (login) {
                res.cookie('user', login, { httpOnly: true });
                return createResponse(req,res,200,login)
            } 
            return createResponse(req,res,400,login)
        } catch (error) {
            next(error);
        }
    };
    
    verify = async (req, res, next) => {
        try {
            const {codigoIngresado}= req.body
            const token = await this.service.verifyCode(req.cookies.user, codigoIngresado);
            
            if (token) {
                res.cookie('token', token, { httpOnly: true });
                res.clearCookie('user');
                return createResponse(req,res,200,token)
            }
            
            return createResponse(req,res,400,token);
        } catch (error) {
            next(error);
        }
    };
    

    profile= async( req, res, next)=>{
        try{
            console.log(req.user)
            if(req.user){
                const user= await this.service.getUserById(req.user.userId);
                return createResponse(req, res, 200, user)
            }
        }catch(error){
        next(error);
        }
    };
};