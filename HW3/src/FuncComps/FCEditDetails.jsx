import React, { useState } from 'react';

function EditDetails({ user, setEditMode, onUserUpdate }) {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "picture") {
            setEditedUser({ ...editedUser, [name]: files[0] });
        } else {
            setEditedUser({ ...editedUser, [name]: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUserUpdate(editedUser); 
        setEditMode(false); 
    };

    const formStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        maxWidth: '600px',
        margin: '0 auto',
    };

    const fieldStyle = {
        marginBottom: '20px',
        width: 'calc(50% - 10px)',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
    };

    const inputStyle = {
        width: '80%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div>
            <h3>Edit Details</h3>
            <form onSubmit={handleSubmit} style={formStyle}>
                {Object.entries(editedUser).map(([key, value]) => (
                    key !== 'email' ? (
                        <div key={key} style={fieldStyle}>
                            <label style={labelStyle} htmlFor={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replaceAll('_', ' ')}
                            </label>
                            <input
                                id={key}
                                type={key === 'password' || key === 'confirmPassword' ? 'password' : key === 'picture' ? 'file' : key === 'birthDate' ? 'date' : 'text'}
                                name={key}
                                value={key !== 'picture' ? value : ''}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    ) : (
                        <div key={key} style={fieldStyle}>
                            <label style={labelStyle} htmlFor={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replaceAll('_', ' ')} (cannot be changed):
                            </label>
                            <input
                                id={key}
                                type="email"
                                name={key}
                                value={value}
                                disabled
                                style={inputStyle}
                            />
                        </div>
                    )
                ))}
                <button type="submit" style={buttonStyle}>Update</button>
            </form>
        </div>
    );
}

export default EditDetails;
