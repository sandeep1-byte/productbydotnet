import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
//import Spinner from 'react-bootstrap/Spinner'; // Assuming you're using react-bootstrap for spinner

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`https://localhost:7284/api/User/signin?email=${email}&password=${password}`);
            Swal.fire('Success!', 'SignIn successfully!', 'success');
            //Clear fields after successful signup
            navigate('/createCategory'); // Navigate to SignIn page
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

  
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-light p-4 rounded shadow" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
                <h2 className="text-center mb-4">Sign In</h2>
                <form id="signInForm" onSubmit={handleSubmit}>
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
                                aria-label="Email"
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
                                aria-label="Password"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary btn-lg" style={{ borderRadius: '10px' }} disabled={loading}>
                            {/*{loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}*/}loading
                        </button>
                    </div>

                    {/* Don't have Account Link */}
                    <div className="text-center">
                        <span>Don't have an account? </span>
                        <a href="/" className="btn btn-link">
                            Create Account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
