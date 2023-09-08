import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEmployeeComponent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: ''
    });

    const navigate = useNavigate();

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
        console.log('Form submitted with data:', employee);

        // After saving, navigate back to the employee list
        navigate('/employees');
    };

    // Event handler for cancel button click
    const handleCancel = () => {
        // Navigate back to the employee list
        navigate('/employees');
        console.log('Cancel button clicked');
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'>Add Employee</h3>
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

                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        placeholder='Last Name'
                                        className='form-control'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />

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
                                    Save
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

export default CreateEmployeeComponent;
