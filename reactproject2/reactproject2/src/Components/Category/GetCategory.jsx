import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GetCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7284/api/Category'); // Corrected URL
                console.log(response.data); // Log the response
                setCategories(response.data); // Ensure this is an array
            } catch (err) {
                setError('Error fetching categories. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won'ts delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://localhost:7284/api/Category/${id}`); // Adjust the URL as needed
                setCategories(categories.filter(category => category.id !== id));
                Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error!', 'There was an error deleting the category.', 'error');
            }
        }
    };
           
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="0table-responsive" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            <table className="table table-striped table-hover table-bordered text-center align-middle" style={{ minWidth: '800px', backgroundColor: 'white', color: 'black' }}>
                <thead className="thead-light" style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'white', color: 'black' }}>
                    <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={category.id} id={`category-${category.id}`}>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>
                                <td>
                                    <button
                                        className="btn btn-sm"
                                        style={{ backgroundColor: '#007bff', color: 'white' }}
                                        onClick={() => handleEdit(category.id)}
                                    >
                                        <i className="fas fa-edit"></i> Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>
                                        <i className="fas fa-trash-alt"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ color: '#ffcccb' }}>No categories available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GetCategory;
