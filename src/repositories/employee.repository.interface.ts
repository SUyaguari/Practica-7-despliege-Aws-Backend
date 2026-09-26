export interface Employee {
  id: string;
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
}

export type CreateEmployeeData = Omit<Employee, 'id'>;
export type UpdateEmployeeData = Partial<CreateEmployeeData>;

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedEmployees {
  items: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IEmployeeRepository {
  findAll(): Promise<Employee[]>;
  findPaginated(pagination: PaginationOptions): Promise<PaginatedEmployees>;
  create(data: CreateEmployeeData): Promise<Employee>;
  update(id: string, data: UpdateEmployeeData): Promise<Employee | null>;
  delete(id: string): Promise<Employee | null>;
}
