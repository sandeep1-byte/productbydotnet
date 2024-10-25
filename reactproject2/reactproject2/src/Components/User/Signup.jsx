import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://localhost:7284/api/User/signup', {
                name,
                email,
                password,
            });
            Swal.fire('Success!', 'Account created successfully!', 'success');
            // Clear fields after successful signup
            setName('');
            setEmail('');
            setPassword('');

            // Redirect to SignIn page
            navigate('/signin'); // Navigate to SignIn page
        } catch (error) {
            Swal.fire('Error!', error.response?.data || 'An error occurred.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-light p-4 rounded shadow" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
                <h2 className="text-center mb-4">Create Account</h2>
                <form id="signUpForm" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                            <input
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ borderRadius: '10px' }}
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <input
                                className="form-control"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ borderRadius: '10px' }}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <input
                                className="form-control"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ borderRadius: '10px' }}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary btn-lg" style={{ borderRadius: '10px' }}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>

                    {/* Already Have Account Link */}
                    <div className="text-center">
                        <span>Already have an account? </span>
                        <a href="/signin" className="btn btn-link">
                            Sign In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
