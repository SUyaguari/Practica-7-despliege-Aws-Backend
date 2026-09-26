import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { NextFunction, Request, Response } from 'express';
import type {
  CreateEmployeeData,
  Employee,
  IEmployeeRepository,
} from '../repositories/employee.repository.interface.js';
import { createEmployeeController } from './empleados.controllers.js';

describe('🧪 Unit Test: EmployeeController (Mantenibilidad & Testabilidad)', () => {
  let controller: ReturnType<typeof createEmployeeController>;
  let mockRepository: jest.Mocked<IEmployeeRepository>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextMock: NextFunction;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  const fakeEmployee: Employee = {
    id: '652f1f77bcf86cd799439011',
    nombre: 'Andrés Mendoza',
    cargo: 'Arquitecto',
    departamento: 'TI',
    sueldo: 4000,
  };

  beforeEach(() => {
    // 1. Mock 100% aislado de la interfaz (cero dependencia de Mongoose)
    mockRepository = {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    controller = createEmployeeController(mockRepository);

    // 2. Mock del ciclo de vida de Express
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockResponse = { status: statusMock };
    nextMock = jest.fn();
  });

  it('getEmpleado: debería retornar 200 y la lista de empleados de la abstracción', async () => {
    mockRepository.findAll.mockResolvedValue([fakeEmployee]);
    mockRequest = {};

    await controller.getEmpleado(mockRequest as Request, mockResponse as Response, nextMock);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: [fakeEmployee] }),
    );
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('getEmpleado: debería delegar el error al middleware si el repositorio falla', async () => {
    const dbError = new Error('Fallo de conexión simulado');
    mockRepository.findAll.mockRejectedValue(dbError);
    mockRequest = {};

    await controller.getEmpleado(mockRequest as Request, mockResponse as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith(dbError);
    expect(statusMock).not.toHaveBeenCalled();
  });

  it('addEmpleado: debería retornar 201 y el empleado creado', async () => {
    const payload: CreateEmployeeData = {
      nombre: 'Andrés Mendoza',
      cargo: 'Arquitecto',
      departamento: 'TI',
      sueldo: 4000,
    };
    mockRepository.create.mockResolvedValue(fakeEmployee);
    mockRequest = { body: payload };

    await controller.addEmpleado(mockRequest as Request, mockResponse as Response, nextMock);

    expect(mockRepository.create).toHaveBeenCalledWith(payload);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: fakeEmployee }),
    );
  });

  it('addEmpleado: debería delegar el error al middleware si el repositorio falla', async () => {
    const dbError = new Error('Violación de restricción simulada');
    mockRepository.create.mockRejectedValue(dbError);
    mockRequest = {
      body: { nombre: 'Andrés Mendoza', cargo: 'Arquitecto', departamento: 'TI', sueldo: 4000 },
    };

    await controller.addEmpleado(mockRequest as Request, mockResponse as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith(dbError);
    expect(statusMock).not.toHaveBeenCalled();
  });

  it('updateEmpleado: debería retornar 200 con el empleado actualizado', async () => {
    const updated = { ...fakeEmployee, sueldo: 4500 };
    mockRepository.update.mockResolvedValue(updated);
    mockRequest = { params: { id: fakeEmployee.id }, body: { sueldo: 4500 } };

    await controller.updateEmpleado(
      mockRequest as Request,
      mockResponse as Response,
      nextMock,
    );

    expect(mockRepository.update).toHaveBeenCalledWith(fakeEmployee.id, { sueldo: 4500 });
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ data: updated }));
  });

  it('updateEmpleado: debería delegar un AppError 404 si el empleado no existe', async () => {
    mockRepository.update.mockResolvedValue(null);
    mockRequest = { params: { id: 'inexistente' }, body: { sueldo: 4500 } };

    await controller.updateEmpleado(
      mockRequest as Request,
      mockResponse as Response,
      nextMock,
    );

    expect(nextMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'AppError', statusCode: 404 }),
    );
    expect(statusMock).not.toHaveBeenCalled();
  });

  it('deleteEmpleado: debería retornar 200 sin datos al eliminar correctamente', async () => {
    mockRepository.delete.mockResolvedValue(fakeEmployee);
    mockRequest = { params: { id: fakeEmployee.id } };

    await controller.deleteEmpleado(
      mockRequest as Request,
      mockResponse as Response,
      nextMock,
    );

    expect(mockRepository.delete).toHaveBeenCalledWith(fakeEmployee.id);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ success: true, data: null }));
  });

  it('deleteEmpleado: debería delegar un AppError 404 si el empleado no existe', async () => {
    mockRepository.delete.mockResolvedValue(null);
    mockRequest = { params: { id: 'inexistente' } };

    await controller.deleteEmpleado(
      mockRequest as Request,
      mockResponse as Response,
      nextMock,
    );

    expect(nextMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'AppError', statusCode: 404 }),
    );
    expect(statusMock).not.toHaveBeenCalled();
  });
});
