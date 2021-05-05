import { BaseApiService } from './base.service';
import { ApiResponse } from '../types/Api';
import { InfoAddEmployee } from '../types/Employee';

export class EmployeeServiceFactory extends BaseApiService {
  async getEmployees(): Promise<ApiResponse> {
    return await this.get('/api/employees');
  }

  async createEmployee(data: InfoAddEmployee): Promise<ApiResponse> {
    return await this.post('/api/employees', data);
  }
}

export const EmployeeService = new EmployeeServiceFactory();
