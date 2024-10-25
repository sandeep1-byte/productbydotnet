import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCategoryName('');

        try {
            const response = await axios.post('https://localhost:7284/api/Category', { categoryName });
            console.log(response);

            // Display success alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data.message || 'Category created successfully!',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/getCategory'); // Navigate to the getCategory route after the alert is confirmed
            });
        } catch (err) {
            console.error(err); // Log the error
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error creating category. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center mt-5 w-100 vh-50">
            <div className="mx-auto rounded p-4 shadow bg-light" style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', padding: '40px', width: '450px' }}>
                <h3 className="text-center mb-4 text-dark">Add Categories</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="form-label" style={{ fontWeight: 500, color: 'black' }}>Category Name *</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="form-control"
                            placeholder="Enter new category name"
                            required
                            style={{ color: 'black' }}
                        />
                    </div>

                    {/* Button */}
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary px-4 py-2" style={{ width: '100%' }}>
                            <i className="bi bi-save"></i> Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCategory;
