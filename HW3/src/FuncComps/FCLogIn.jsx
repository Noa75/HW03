import React, { useState } from 'react';

function FCLogin({ onLoginSuccess }) {
    
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({}); 
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
  
        if (Object.keys(errors).length === 0) {
            onLoginSuccess(credentials);
        } else {
            
            console.error('Validation errors:', errors);
        }
    };


    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        margin: '20px auto',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '0.8rem',
        height: '1rem',
    };

    const buttonStyle = {
        padding: '10px 20px',
        marginTop: '10px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    };

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    {errors.username && <p style={errorStyle}>{errors.username}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    {errors.password && <p style={errorStyle}>{errors.password}</p>}
                </div>
                <button type="submit" style={buttonStyle}>Log In</button>
            </form>
        </div>
    );
}

export default FCLogin;
