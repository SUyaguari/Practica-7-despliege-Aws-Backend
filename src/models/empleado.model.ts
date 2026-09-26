import { Schema, model } from 'mongoose';

export interface EmployeeRecord {
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
}

const empleadoSchema = new Schema<EmployeeRecord>(
  {
    nombre: { type: String, required: true },
    cargo: { type: String, required: true },
    departamento: { type: String, required: true },
    sueldo: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EmployeeModel = model<EmployeeRecord>('Empleado', empleadoSchema);
