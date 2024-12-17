import Controllers from "./class.controller.js";
import ClientService from "../services/client.services.js";
import { createResponse } from "../utils/createResposnse.js";
import { query } from "express";

const clientService= new ClientService();

export default class ClientControllers extends Controllers{
    constructor(){
        super(clientService);
    }

    status = async(req, res, next) =>{
        try {
            const { estado } = req.query;
            if (!estado) {
                return res.status(400).json({ message: "status parameter is required" });
              }
            const data = await this.service.getByStatus(estado);
            !data ? createResponse(req, res, 404, data) : createResponse(req, res, 200, data);
        }catch (error) {
          next(error);
        }
      };
    
    search = async(req, res, next) =>{
    try {
        const { search }= req.query;
        if (!search) {
            return res.status(400).json({ message: "search parameter is required" });
          }
        const data = await this.service.getBySearch(search);
        !data ? createResponse(req, res, 404, data) : createResponse(req, res, 200, data);
    }catch (error) {
        next(error);
        }
    };
    
    inicialData= async (req, res, next)=>{
        try{
            const data= await this.service.getInicial();
            !data ? createResponse(req, res, 404, data) : createResponse(req, res, 200, data);
        }catch (error) {
            next(error);
            }
    }

    mockUsers= async(req, res, next)=>{
        try{
            const {cant}=req.params;
            const data= await this.service.generateUsers(cant);
            !data ? createResponse(req, res, 404, data) : createResponse(req, res, 200, data);
        }catch (error) {
            next(error);
            }
    }
};