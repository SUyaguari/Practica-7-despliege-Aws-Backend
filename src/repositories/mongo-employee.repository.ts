import type { HydratedDocument } from 'mongoose';
import { EmployeeModel, type EmployeeRecord } from '../models/empleado.model.js';
import type {
  CreateEmployeeData,
  Employee,
  IEmployeeRepository,
  UpdateEmployeeData,
} from './employee.repository.interface.js';

export class MongoEmployeeRepository implements IEmployeeRepository {
  async findAll(): Promise<Employee[]> {
    const employees = await EmployeeModel.find();
    return employees.map((employee) => this.toDomain(employee));
  }

  async create(data: CreateEmployeeData): Promise<Employee> {
    const employee = await EmployeeModel.create(data);
    return this.toDomain(employee);
  }

  async update(id: string, data: UpdateEmployeeData): Promise<Employee | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(id, data, { new: true });
    return employee ? this.toDomain(employee) : null;
  }

  async delete(id: string): Promise<Employee | null> {
    const employee = await EmployeeModel.findByIdAndDelete(id);
    return employee ? this.toDomain(employee) : null;
  }

  private toDomain(employee: HydratedDocument<EmployeeRecord>): Employee {
    return {
      id: employee._id.toString(),
      nombre: employee.nombre,
      cargo: employee.cargo,
      departamento: employee.departamento,
      sueldo: employee.sueldo,
    };
  }
}
