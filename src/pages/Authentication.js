import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Authentication(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            });

            // Save the token in local storage
            localStorage.setItem('token', response.data.token);
            console.log('Login successful:', response.data);
            navigate('/MainPage');
        } catch (err) {
            setError('Login failed. Please check your email and password.');
            console.error('Error logging in:', err);
        }
    };
    
    return (
        <div className='mt-40 ml-40'>
            <form onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Authentication;