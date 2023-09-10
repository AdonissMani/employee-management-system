package com.example.sqlcrud.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import com.example.sqlcrud.collection.Employee;
import com.example.sqlcrud.repository.EmployeeRepository;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000") // Remove the trailing slash
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() { // Correct the method name
        return employeeRepository.findAll();
    }

    //create employee
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    //get employee by id REST API
    @GetMapping("/employees/{id}") // Add "employees" to the path
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
        .orElseThrow(()-> new ResourceAccessException("Employee doesn't exist :" + id));
        return ResponseEntity.ok(employee);
    }

    //update employee API
    @PutMapping("/employees/{id}") // Add "employees" to the path
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
     @RequestBody Employee employeeDetails){

        Employee employee = employeeRepository.findById(id)
        .orElseThrow(()-> new ResourceAccessException("Employee doesn't exist :" + id));
        
        
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());

        Employee updateEmployee = employeeRepository.save(employee);

        return ResponseEntity.ok(updateEmployee);

    }

    //Delete Employee API
    @DeleteMapping("/employees/{id}") // Add "employees" to the path
    public Map<String, Boolean> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
        .orElseThrow(()-> new ResourceAccessException("Employee doesn't exist :" + id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE); 
        return response; // Return the response directly, no need for ResponseEntity
    }        
}
