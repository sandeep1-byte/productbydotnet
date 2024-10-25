import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`https://localhost:7284/api/Category/${id}`);
                setCategoryName(response.data.categoryName);
            } catch (err) {
                setError('Error fetching category. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
     try {
           const response = await axios.put(`https://localhost:7284/api/Category/${id}`, { id,categoryName });
             Swal.fire('Success!', 'Category updated successfully!', 'success');
         navigate('/getCategory');
        } catch (error) {
            console.error('Error updating category:', error);
            Swal.fire('Error!', 'There was an error updating the category.', 'error');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <form onSubmit={handleSubmit} className="form-group border shadow-sm p-4 rounded" style={{ maxWidth: '400px', margin: 'auto', backgroundColor: 'white', color: 'black' }}>
            <h3 className="text-center mb-4 text-dark">Edit Category</h3>
            <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Category Name"
                    required
                />
            </div>
            <div className="d-flex justify-content-between text-center">
                <button type="submit" className="btn btn-primary" style={{ width: '48%' }}>Save Changes</button>
                <button type="button" className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/getCategory')}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditCategory;
