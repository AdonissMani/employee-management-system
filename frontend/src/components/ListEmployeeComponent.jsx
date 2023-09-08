import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate(); // Use useNavigate hook for navigation react-router v6

    useEffect(() => {
        EmployeeService.getEmployees().then((res) => {
            setEmployees(res.data);
        });
    }, []);

    const addEmployee = () => {
        navigate('/add-employee'); // Use navigate function to change the route
    };

    return (
        <div>
            <h2 className="text-center">Employee List</h2>
            <div className='row'>
                <button className='btn btn-primary' onClick={addEmployee}>Add Employee</button>
            </div>
            <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeeComponent;
