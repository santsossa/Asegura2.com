import Services from "./class.services.js";
import ClientDaoMongo from "../DAO/clients.dao.js";

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
        // Definir el objeto de condición de búsqueda
        const searchCondition = {};
        const searchableFields = ['nombre', 'apellido', 'correo', 'cedula', 'estado'];
        
        // Buscar solo en los campos que contienen el término de búsqueda
        // Usamos '$or' para que se pueda hacer una búsqueda en cualquiera de los campos
        const orConditions = searchableFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' }
        }));

        // Usamos '$or' para combinar todas las búsquedas
        searchCondition.$or = orConditions;

        // Llamamos a la función que realiza la búsqueda en la base de datos
        const results = await this.dao.getClientBySearch(searchCondition);
        
        // Si no encontramos resultados, retornamos null
        if (results.length === 0) {
            return null;
        }
        
        return results;
    } catch (error) {
        // Lanzamos un error si algo sale mal
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
}