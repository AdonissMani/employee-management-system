import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeFormComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
    });
    const [message, setMessage] = useState(null); // State for messages

    useEffect(() => {
        if (id) {
            // Load the employee data for editing when the component mounts
            EmployeeService.getEmployeeById(id)
                .then((res) => {
                    const employeeData = res.data;
                    setFormData(employeeData);
                })
                .catch((error) => {
                    setMessage('Error loading employee data.');
                });
        }
    }, [id]);

    // Event handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Event handler for form submission
    const saveEmployee = (e) => {
        e.preventDefault();
        // You can handle the form submission logic here, e.g., send data to an API
        let employee = { ...formData };

        if (id) {
            // Update an existing employee
            EmployeeService.updateEmployee(id, employee)
                .then((res) => {
                        alert('Employee updated successfully');
                        navigate('/employees');
                })
                .catch((error) => {
                    setMessage('Error updating employee.');
                });
        } else {
            // Create a new employee
            EmployeeService.createEmployee(employee)
                .then((res) => {
                   
                        alert('Employee created successfully');
                        navigate('/employees');
                    
                })
                .catch((error) => {
                    setMessage('Error creating employee.');
                });
        }
    };

    // Event handler for cancel button click
    const handleCancel = () => {
        // Navigate back to the employee list
        navigate('/employees');
    };

    return (
        <div>
            {message && <div className='message'>{message}</div>}
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'>
                            {id ? 'Update Employee' : 'Add Employee'}
                        </h3>
                        <div className='card-body'>
                            <form onSubmit={saveEmployee}>
                                <div className='form-group'>
                                    <label>First Name</label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        placeholder='First Name'
                                        className='form-control'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <br></br>
                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        placeholder='Last Name'
                                        className='form-control'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <br></br>
                                    <label>Email</label>
                                    <input
                                        type='email'
                                        name='emailId'
                                        placeholder='Email'
                                        className='form-control'
                                        value={formData.emailId}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className='btn btn-success' type='submit'>
                                    {id ? 'Update' : 'Save'}
                                </button>
                                <button
                                    className='btn btn-danger ml-2'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeFormComponent;
