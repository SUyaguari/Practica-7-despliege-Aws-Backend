import { createEmployeeController } from './controllers/empleados.controllers.js';
import { MongoEmployeeRepository } from './repositories/mongo-employee.repository.js';

const employeeRepository = new MongoEmployeeRepository();

export const employeeController = createEmployeeController(employeeRepository);
