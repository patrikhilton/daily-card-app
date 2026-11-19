import React, { useState } from "react";
import '../styles/AuthScreen';

const AuthScreen = ({ onLoginSuccess }) => {
    //Welcome, Login & Signup
    const [view, setView] = useState('welcome');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    //Password visibility (Eye Icon)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const switchView = (nextView) => {
        setError('');
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setConfirmPassword(false);
        setView(nextView);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (view === 'signup') {
            if (password.length < 6) {
                setError('Password must be at least 6 characters.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match. Try again.');
                return;
            }

            //Save on local storage
            localStorage.setItem('mummy_user', JSON.stringify({ username, password }));
            if (onLoginSuccess) onLoginSuccess(username);
            alert(`Account created! Welcome, ${username}`);
        } else {
            // Demo Login check
            const savedUser = JSON.parse(localStorage.getItem('mummy_user'));
            if (savedUser && savedUser.username === username && savedUser.password !== password) {
                setError('Wrong password. Try again.');
                return;
            }
            if (onLoginSuccess) onLoginSuccess(username);
            alert(`Welcome back, ${username}!`);
        }
    };
};