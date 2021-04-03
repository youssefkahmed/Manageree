import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee: Employee | null | undefined;
  public deleteEmployee: Employee | null | undefined;

  constructor(private employeeService: EmployeeService) {}

  // Running the getEmployees() function when the AppComponent starts
  ngOnInit(): void {
    this.getEmployees();
  }

  // Storing all Employees in an array to be accessed in the HTML code
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    );
  }

  // Modals Control Function
  public onOpenModal(employee: Employee|null, mode: string): void{
    // Grabbing the main container
    const container = document.getElementById("main-container");
    
    // Creating a hidden button to open the proper modal
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    // Checking modal type
    if(mode === "add")
      button.setAttribute("data-target", "#addEmployeeModal");
    
    else if(mode === "edit"){
      this.editEmployee = employee;
      button.setAttribute("data-target", "#updateEmployeeModal");
    }
    else if(mode === "delete"){
      this.deleteEmployee = employee;
      button.setAttribute("data-target", "#deleteEmployeeModal");
    }

    // Adding the button to the main container
    container?.appendChild(button);

    // Simulating a button click to open the modal
    button.click();
  }

  // Add, Update, and Delete functionalities

  // Adding a new employee through a form
  public onAddEmployee(addForm: NgForm): void{
    document.getElementById("add-employee-form")?.click();  
    this.employeeService.addNewEmployee(addForm.value)
      .subscribe(
        (response: Employee) => {
          addForm.reset();
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          addForm.reset();
          alert(error.message);
        }
      );
  }

  // Editing an existing employee through a form
  public onUpdateEmployee(employee: Employee): void{  
    this.employeeService.updateEmployee(employee)
      .subscribe(
        (response: Employee) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  // Deleting an employee
  public onDeleteEmployee(id: number|undefined): void{  
    if(!id)
      return;
    this.employeeService.deleteEmployee(id)
      .subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  // Searching for employees
  public searchForEmployees(query: string): void{
    // Array to hold search results
    const searchResult: Employee[] = [];

    /* For each employee, check if their name, or email, or phone number
    matches the search query*/
    for(let employee of this.employees){
      if(employee.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
         employee.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
         employee.phoneNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          searchResult.push(employee);
         }
    }

    // Assign the search result to the employees array to display it
    this.employees = searchResult;

    // Otherwise, assign the default employees array
    if(searchResult.length === 0 || !query){
      this.getEmployees();
    }
  } 
}
