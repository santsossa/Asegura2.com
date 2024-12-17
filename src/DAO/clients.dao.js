import MongoDao from "./mongo.dao.js";
import { ClientModel } from "./models/clients.model.js";

export default class ClientDaoMongo extends MongoDao {
    constructor(){
        super(ClientModel)
    }

    async getClientByStatus(status){
        try {
            return await this.model.find({ estado: status })
        } catch (error) {
            throw new Error(error)
        }
    }

    async getClientBySearch(search){
        try {
            return await this.model.find(search);
        } catch (error) {
            throw new Error(error)
        }
    }
    async getIncialClients(){
        try{
            return await this.model.find({ estado: 'prospect' });
        } catch (error) {
            throw new Error(error)
        }
    }
}