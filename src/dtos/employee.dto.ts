import { z } from 'zod';

export const employeeIdParamsSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'El id debe ser un ObjectId válido de 24 caracteres hexadecimales'),
});

const text = (campo: string) =>
  z
    .string(`${campo} es obligatorio y debe ser texto`)
    .trim()
    .min(2, `${campo} debe tener al menos 2 caracteres`)
    .max(100, `${campo} no puede superar los 100 caracteres`);

export const createEmployeeSchema = z.strictObject({
  nombre: text('nombre'),
  cargo: text('cargo'),
  departamento: text('departamento'),
  sueldo: z
    .number('sueldo es obligatorio y debe ser numérico')
    .positive('sueldo debe ser mayor a 0')
    .max(1_000_000, 'sueldo excede el máximo permitido'),
});

export const updateEmployeeSchema = createEmployeeSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar',
  });

export type EmployeeIdParams = z.infer<typeof employeeIdParamsSchema>;
export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;
