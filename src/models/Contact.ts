import mongoose, { Document, Schema, Types } from "mongoose";

export interface IContact extends Document {
  client: Types.ObjectId;
  result: string;
}

export const ContactSchema: Schema = new Schema({
  client: {
    type: Types.ObjectId,
    ref: 'Client'
  },
  result: {
    type: String,
    trim: true,
    required: true
  }
}, {timestamps: true});

const Contact = mongoose.model<IContact>('Contact', ContactSchema);
export default Contact;