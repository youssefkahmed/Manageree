package com.jojo.manageree.controllers;

import com.jojo.manageree.models.Employee;
import com.jojo.manageree.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Getting all employees as a list
    @GetMapping("/all")
    public List<Employee> getAllEmployees(){
        return employeeService.findAllEmployees();
    }

    // Getting a single employee using their ID
    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id){
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // Adding a new employee
    @PostMapping("/add")
    public ResponseEntity<Employee> addNewEmployee(@RequestBody Employee employee){
        Employee newEmployee = employeeService.addNewEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.OK);
    }

    // Updating an employee
    @PutMapping("/add")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee){
        Employee updatedEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    // Deleting an employee using their ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployeeById(@PathVariable("id") Long id){
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
