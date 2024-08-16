import mongoose, { Document, Schema } from "mongoose";
import Contact from "./Contact";

// Creamos un interface para tipar el modelo
export interface IClient extends Document {
  name: string;
  last_name: string;
  telephone: string;
  vehicle: string;
  type_oil: string;
  brand_oil: string;
  filter: string;
  mileage: string;
  service_date: Date;
  contact: string;
}

// creamos el schema de clientes
const ClientSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    default: '---'
  },
  last_name: {
    type: String,
    trim: true,
    default: '---'
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
    default: '0000000000'
  },
  vehicle: {
    type: String,
    trim: true,
    default: '---'
  },
  type_oil: {
    type: String,
    trim: true,
    default: '---'
  },
  brand_oil: {
    type: String,
    trim: true,
    default: '---'
  },
  filter: {
    type: String,
    trim: true,
    default: '---'
  },
  mileage: {
    type: String,
    trim: true,
    default: '0000'
  },
  service_date: {
    type: Date,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    default: '-'
  }
}, {timestamps: true});

// Al eliminar un registro de la BDD de clientes, se elimina también su contacto asociado con el ID.
ClientSchema.pre('deleteOne', {document: true}, async function() {
  const clientId = this._id;
  if(!clientId) return;
  await Contact.deleteMany({client: clientId});
});

// Vamos a generar el modelo
const Client = mongoose.model<IClient>('Client', ClientSchema);
export default Client;