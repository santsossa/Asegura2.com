import { model, Schema } from "mongoose";

const ClientSchema = new Schema({
  entrada: { type: Date, default: Date.now }, 
  estado: { type: String, default: "prospect"}, 
  observacion: { type: String }, 
  nombre: { type: String, required: true }, 
  apellido: { type: String, required: true }, 
  cedula: { type: String, unique: true, required: true }, 
  fecha_nacimiento: { type: Date },
  correo: { type: String, required: true }, 
  celular: { type: String }, 
  genero: { type: String}, 
  ciudad: { type: String }, 
  placa: { type: String },
  modelo: { type: String },
  valor_asegurado: { type: String }, 
  allianz: { type: String}, 
  solidaria_full: { type: String, default: 0 }, 
  equidad_full: { type: String, default: 0 }, 
  hdi: { type: String, default: 0 }, 
  bolivar_full: { type: String}, 
  sbs_full: { type: String},
  equidad_seguros_livianos: { type: String},
  solidaria_livianos: { type: String}, 
  axa: { type: String}, 
  sbs_liviano: { type: String}, 
  bolivar_basico: { type: String }, 
  mapfre: { type: String }, 
  liberty: { type: String}, 
}, { timestamps: true }); 


const clients= "clients"
export const ClientModel = model(clients, ClientSchema);