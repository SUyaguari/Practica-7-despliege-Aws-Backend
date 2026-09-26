import { Router } from 'express';
import { employeeController } from '../dependencies.js';
import {
  createEmployeeSchema,
  employeeIdParamsSchema,
  updateEmployeeSchema,
} from '../dtos/employee.dto.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.get('/empleados', employeeController.getEmpleado);
router.post('/empleados', validate(createEmployeeSchema), employeeController.addEmpleado);
router.put(
  '/empleados/:id',
  validate(employeeIdParamsSchema, 'params'),
  validate(updateEmployeeSchema),
  employeeController.updateEmpleado,
);
router.delete(
  '/empleados/:id',
  validate(employeeIdParamsSchema, 'params'),
  employeeController.deleteEmpleado,
);

export default router;
