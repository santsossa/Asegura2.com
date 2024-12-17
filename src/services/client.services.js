import Services from "./class.services.js";
import ClientDaoMongo from "../DAO/clients.dao.js";
import { generateClients } from "../utils/faker.js";

const clientDao = new ClientDaoMongo()

export default class ClientService extends Services {
  constructor() {
    super(clientDao);
  }

  async getByStatus(status) {
    try {
        const validWords = ['prospect', 'contacted', 'in-process', 'completed', 'not-interested', 'renovation', 'no-product'];
        if (validWords.includes(status)) {
            const data = await this.dao.getClientByStatus(status);
            return data;
        }
        return null
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBySearch(search) {
    try {
        const searchCondition = {};
        const searchableFields = ['nombre', 'apellido', 'correo', 'cedula', 'estado'];
        const orConditions = searchableFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' }
        }));
        searchCondition.$or = orConditions;
        const results = await this.dao.getClientBySearch(searchCondition);
                if (results.length === 0) {
            return null;
        }
        return results;
    } catch (error) {
        throw new Error(error);
    }
}

  async getInicial(){
    try{
        const data_inicial = await this.dao.getIncialClients()
        if (!data_inicial) return null;
        return data_inicial
    } catch (error) {
        throw new Error(error)
    }
  }

  async generateUsers(cant){
    try{
      const clients= generateClients(cant)
      if (clients){
        const clientesDB= await this.dao.postClients(clients)
        if (clientesDB) return clientesDB
        return null
      }
      return null
    }catch (error) {
      throw new Error(error)
  }
  }
}