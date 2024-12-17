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
  genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] }, 
  ciudad: { type: String }, 
  placa: { type: String },
  modelo: { type: String },
  valor_asegurado: { type: Number }, 
  allianz: { type: Number, default: 0 }, 
  solidaria_full: { type: Number, default: 0 }, 
  equidad_full: { type: Number, default: 0 }, 
  hdi: { type: Number, default: 0 }, 
  bolivar_full: { type: Number, default: 0 }, 
  sbs_full: { type: Number, default: 0 },
  equidad_seguros_livianos: { type: Number, default: 0 },
  solidaria_livianos: { type: Number, default: 0 }, 
  axa: { type: Number, default: 0 }, 
  sbs_liviano: { type: Number, default: 0 }, 
  bolivar_basico: { type: Number, default: 0 }, 
  mapfre: { type: Number, default: 0 }, 
  liberty: { type: Number, default: 0 }, 
}, { timestamps: true }); 


const clients= "clients"
export const ClientModel = model(clients, ClientSchema);