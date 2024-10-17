import { UserModel } from "../DAO/models/users.model.js";

export default class UserDao{
    async existUser(email) {
        try {
          return await UserModel.findOne({ email });
        } catch (error) {
          throw new Error(error);
        }
      }
    
      async register(user) {
        try {
          const { email } = user;
          const existUser = await this.existUser(email);
          if (!existUser) return await UserModel.create(user);
          else return null;
        } catch (error) {
          throw new Error(error);
        }
      }
    
      async login(email, password) {
        try {
          return await UserModel.findOne({ email, password });
        } catch (error) {
          throw new Error(error);
        }
      }
    }
