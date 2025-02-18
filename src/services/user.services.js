import Services from "./class.services.js";
import UserDaoMongo from "../DAO/user.dao.js";
import "dotenv/config";
import { enviarCodigoSeguridad, validarCodigoSeguridad } from "../utils/nodemailer.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import UserDTO from "../dto/user.dto.js";
import Auth from "../middlewares/auth.js";
const auth= new Auth();
const userDao = new UserDaoMongo();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const newUser = await this.dao.create({
          ...user,
          password: createHash(password),
        });
        console.log(newUser)
        return new UserDTO(newUser);
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid) enviarCodigoSeguridad(email)
      if (enviarCodigoSeguridad) return new UserDTO(userExist)
      return null
    } catch (error) {
      throw new Error(error);
    }
  }
  async verifyCode(user,codigoIngresado){
    try{
      const { email } = user;
      const validarCodigo= validarCodigoSeguridad(email,codigoIngresado);
      if (validarCodigo) return auth.generateToken(user)
      return null
    }catch(error){
      throw new Error(error)
    }
  }
  getUserById = async (id) => {
    try {
      const user = await this.dao.getUserById(id);
      return new UserDTO(user);
    } catch (error) {
      throw new Error(error);
    }
  };
}

