import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState(null); // State for messages
    const navigate = useNavigate();

    useEffect(() => {
        EmployeeService.getEmployees().then((res) => {
            setEmployees(res.data);
        });
    }, []);

    const addEmployee = () => {
        navigate('/add-employee');
    };

    const editEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then((res) => {
                // Update the employees list by filtering out the deleted employee
                setEmployees(employees.filter((employee) => employee.id !== id));
                alert('Employee deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
                setMessage('Error deleting employee');
            });
    };

    const viewEmployee = (id) =>{

            EmployeeService.viewEmployee(id)
            .then(res=>{
                navigate(`/view-employee/${id}`)
            })
    }

    return (
        <div>
            
            <h2 className="text-center">Employee List</h2>
            
            <div className='row'>
                <div className='add-employee'>
                    <button className='btn btn-primary' onClick={addEmployee}>Add Employee</button>
                </div>
            </div>
            <br></br>
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
                                <td>
                                    <button style={{ marginLeft: "20px" }} onClick={() => editEmployee(employee.id)} className='btn btn-info'>
                                        Update
                                    </button>
                                    <button style={{ marginLeft: "20px" }} onClick={() => deleteEmployee(employee.id)} className='btn btn-danger'>
                                        Delete
                                    </button>
                                    <button style={{ marginLeft: "20px" }} onClick={() => viewEmployee(employee.id)} className='btn btn-view'>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeeComponent;
