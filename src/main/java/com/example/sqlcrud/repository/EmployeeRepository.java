package com.example.sqlcrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sqlcrud.collection.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    
}
