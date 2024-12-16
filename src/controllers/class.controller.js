import { createResponse } from "../utils.js";

export default class Controllers{
    constructor(service){
        this.service= service;
    }

    getAll= async (req,res,next)=>{
        try{
            const data= await this.service.getAll();
            createResponse(req, res, 200, data); 
        }catch(error){
            next(error);
        };
    };

    getByID= async(req, res, next)=>{
        try{
            const {id}= req.params;
            const  data= await this.service.getByID(id)
            createResponse(req, res, 200, data);
        }catch(error){
            next(error);
        }
    };

    create= async (req, res, next)=>{
        try{
            const obj= req.body;
            const data= await this.service.create(obj)
            createResponse(req,res,200, data);
        }catch(error){
            next(error);
        }
    };

    update= async(req, res, next)=>{
        try{
            const {id}=  req.params;
            const obj= req.body;
            const data = await this.service.update(id,obj)
            if(!data) createResponse(req,res,404,data)
            else createResponse(req, res , 200, data);
        }catch(error){
            next(error);
        }
    }

    delete = async( req,res,next)=>{
        try{
            const {id}= req.params;
            data = await this.service.delete(id)
            if (!data) createResponse(req, res, 404, data)
            else createResponse(req, res, 200, data)
        }catch(error){
            next(error)
        }
    }
};