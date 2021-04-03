package com.jojo.manageree.services;

import com.jojo.manageree.exceptions.EmployeeNotFoundException;
import com.jojo.manageree.models.Employee;
import com.jojo.manageree.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

    @Autowired
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> findAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee findEmployeeById(Long id){
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee of ID " + id + " not found."));
    }

    public Employee addNewEmployee(Employee employee){
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id){
        employeeRepository.deleteById(id);
    }
}
