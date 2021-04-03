import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Employee } from "./employee";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // The URL Link to the Back-End Server
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  // Getting All Employees from Server
  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  // Getting A Signle Employee from Server Using an ID
  public getEmployeeById(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/all/${id}`);
  }

  // Adding an Employee to the Database
  public addNewEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  // Updating an existing Employee
  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  // Deleting an Employee
  public deleteEmployee(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
  }
}
