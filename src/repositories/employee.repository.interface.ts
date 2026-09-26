export interface Employee {
  id: string;
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
}

export type CreateEmployeeData = Omit<Employee, 'id'>;
export type UpdateEmployeeData = Partial<CreateEmployeeData>;

export interface IEmployeeRepository {
  findAll(): Promise<Employee[]>;
  create(data: CreateEmployeeData): Promise<Employee>;
  update(id: string, data: UpdateEmployeeData): Promise<Employee | null>;
  delete(id: string): Promise<Employee | null>;
}
