import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { fullName, email, password, confirmPassword, phone } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Frontend Validation
        if (!fullName || !email || !password || !confirmPassword || !phone) {
            setError('All fields are required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/register', {
                name: fullName,
                email,
                password,
                phone
            });

            setMessage(res.data.message);
            console.log('Saved User:', res.data.user);

            // Clear Form
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: ''
            });

        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            console.error(err.response?.data);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>User Registration</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={fullName} onChange={onChange} style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={onChange} style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Phone Number:</label>
                    <input type="text" name="phone" value={phone} onChange={onChange} style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={onChange} style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Register</button>
            </form>
        </div>
    );
};

export default Register;
