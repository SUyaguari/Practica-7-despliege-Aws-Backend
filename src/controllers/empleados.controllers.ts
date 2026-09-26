import type { NextFunction, Request, Response } from 'express';
import type { EmployeeIdParams } from '../dtos/employee.dto.js';
import type { IEmployeeRepository } from '../repositories/employee.repository.interface.js';
import { ResponseWrapper } from '../utils/api-response.js';
import { AppError } from '../utils/app-error.js';

export const createEmployeeController = (employeeRepository: IEmployeeRepository) => ({
  getEmpleado: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const empleados = await employeeRepository.findAll();
      ResponseWrapper.success(res, empleados, 'Empleados obtenidos');
    } catch (error) {
      next(error);
    }
  },

  addEmpleado: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const empleado = await employeeRepository.create(req.body);
      ResponseWrapper.created(res, empleado, 'Empleado guardado');
    } catch (error) {
      next(error);
    }
  },

  updateEmpleado: async (
    req: Request<EmployeeIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const empleado = await employeeRepository.update(req.params.id, req.body);
      if (!empleado) throw AppError.notFound('Empleado no encontrado');
      ResponseWrapper.success(res, empleado, 'Empleado actualizado');
    } catch (error) {
      next(error);
    }
  },

  deleteEmpleado: async (
    req: Request<EmployeeIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const empleado = await employeeRepository.delete(req.params.id);
      if (!empleado) throw AppError.notFound('Empleado no encontrado');
      ResponseWrapper.success(res, null, 'Empleado eliminado');
    } catch (error) {
      next(error);
    }
  },
});
