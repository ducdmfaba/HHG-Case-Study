import { BaseApiService } from './base.service';
import { ApiResponse } from '../types/Api';

export class EmployeeServiceFactory extends BaseApiService {
  async getEmployees(): Promise<ApiResponse> {
    return await this.get('/api/employees');
  }
}

export const EmployeeService = new EmployeeServiceFactory();
