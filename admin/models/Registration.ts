import mongoose, { Schema, Document } from 'mongoose'

export interface IRegistration extends Document {
  name: string
  age: number
  gender: string
  nationality: string
  education: string
  currentJob: string
  awarenessActivity: string
  contribution: string
  phone: string
  whatsapp: string
  email: string
  createdAt: Date
}

const registrationSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    education: { type: String, required: true },
    currentJob: { type: String, required: true },
    awarenessActivity: { type: String, required: true },
    contribution: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', registrationSchema)
