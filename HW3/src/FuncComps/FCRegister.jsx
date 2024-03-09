import React, { useState } from 'react';

export default function FCRegister() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        picture: null,
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        city: '',
        street: '',
        streetNumber: '',
    });

    const [preview, setPreview] = useState('');
    const [errors, setErrors] = useState({});
    const [imageBase64, setImageBase64] = useState('');

    const handleImageChange = (file) => {
        if (file) {
            return convertToBase64(file, (base64) => {
                setImageBase64(base64);
            });
        }
    };

    function convertToBase64(file, callback) {
        const reader = new FileReader();
        reader.onload = () => {
            callback(reader.result);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
        reader.readAsDataURL(file);
    }

    const validateField = (name, value, files) => {
        let errMsg = '';
        switch (name) {
            case 'username':
                if (!/^[a-zA-Z0-9!@#$%^&*()_+=-]{1,60}$/.test(value)) {
                    errMsg = 'Username must be 1-60 characters, including letters, numbers, and special characters.';
                }
                break;
            case 'password':
                if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-]).{7,12}$/.test(value)) {
                    errMsg = 'Password must be 7-12 characters, including at least one uppercase letter, one number, and one special character.';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    errMsg = 'Passwords do not match.';
                }
                break;
            case 'picture':
                // if (files && files[0] && !/\.(jpg|jpeg)$/i.test(files[0].name)) {
                //     errMsg = 'Only JPG/JPEG files are accepted.';
                // }
                break;
            case 'firstName':
            case 'lastName':
                if (!/^[a-zA-Z]+$/.test(value)) {
                    errMsg = 'Only English letters are allowed.';
                }
                break;
            case 'email':
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
                    errMsg = 'Invalid email format.';
                }
                break;
            case 'birthDate':
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 10 || age > 100) {
                    errMsg = 'Age must be between 10 to 100 years.';
                }
                break;
            case 'street':
                if (!/^[א-ת\s]+$/.test(value)) {
                    errMsg = 'Only Hebrew letters are allowed.';
                }
                break;
            case 'streetNumber':
                if (!/^\d+$/.test(value) || parseInt(value, 10) <= 0) {
                    errMsg = 'Street number must be a positive number.';
                }
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: errMsg }));
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            const file = files[0];
            const tempURL = URL.createObjectURL(file)
            const img64 = handleImageChange(file);
            setFormData({ ...formData, [name]: imageBase64 });
            setPreview(file ? tempURL : '');
        } else {
            setFormData({ ...formData, [name]: value });
        }
        validateField(name, value, files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const noErrors = Object.values(errors).every(error => !error);
        if (noErrors) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.some(user => user.email === formData.email);
            if (!userExists) {
                users.push(formData);
                localStorage.setItem('users', JSON.stringify(users));
                alert('User registered successfully');
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    picture: imageBase64,
                    firstName: '',
                    lastName: '',
                    email: '',
                    birthDate: '',
                    city: '',
                    street: '',
                    streetNumber: '',
                });
                setPreview('');
            } else {
                alert('A user with this email already exists.');
            }
        } else {
            console.error('Validation errors:', errors);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto' }}>
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '20px', width: 'calc(50% - 10px)' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }} htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replaceAll('_', ' ')}
                        </label>
                        {key === 'picture' && preview && (
                            <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />
                        )}
                        <input
                            id={key}
                            type={key === 'password' || key === 'confirmPassword' ? 'password' : key === 'picture' ? 'file' : key === 'birthDate' ? 'date' : 'text'}
                            name={key}
                            value={key !== 'picture' ? value : ''}
                            onChange={handleChange}
                            style={{ width: '80%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            accept={key === 'picture' ? '.jpg, .jpeg' : ''}
                        />
                        {errors[key] && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors[key]}</div>}
                    </div>
                ))}
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
        </div>
    );
}
