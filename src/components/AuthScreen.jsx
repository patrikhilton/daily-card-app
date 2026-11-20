import React, { useState } from "react";
import '../styles/AuthScreen.scss';

const AuthScreen = ({ onLoginSuccess }) => {
    //Welcome, Login & Signup
    const [view, setView] = useState('welcome');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    //Password visibility (Eye Icon)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const switchView = (nextView) => {
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        setView(nextView);
    };

    //Email format checker
    const isValidEmail = (emailStr) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        //Common Validations
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        //Get Registered Users
        const usersList = JSON.parse(localStorage.getItem('mummy_users_db')) || [];
        const normalizedEmail = email.trim().toLowerCase();

        if (view === 'signup') {

            //Checking for Signup
            if (!username.trim()) {
                setError('Please enter a username.');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match. Try again.');
                return;
            }

            //Primary Key Check
            const emailExists = usersList.some((u) => u.email === normalizedEmail);
            if (emailExists) {
                setError('This email is already registered. Please log in.');
                return;
            }

            //Save on local storage
            const newUser = {
                email: normalizedEmail, //Primary Key
                username: username.trim(),
                password: password,
            };
            usersList.push(newUser);
            localStorage.setItem('mummy_users_db', JSON.stringify(usersList));

            //Update about login to App.jsx
            if (onLoginSuccess) {
                onLoginSuccess({
                    email: newUser.email,
                    username: newUser.username,
                });
            }

            //alert(`Account created! Welcome, ${newUser.username}`);
        } else {

            //Login check
            const foundUser = usersList.find((u) => u.email === normalizedEmail);

            if (!foundUser) {
                setError('No account found with this email. Please sign up.');
                return;
            }

            if (foundUser.password !== password) {
                setError('Wrong password. Try again.');
                return;
            }

            //Update about Login Completed
            if (onLoginSuccess) {
                onLoginSuccess({
                    email: foundUser.email,
                    username: foundUser.username,
                });
            }
            //alert(`Welcome back, ${foundUser.username}!`);
        }
    };

    return (
        <div className="auth-screen">

            {/* 1. Welcome Screen */}
            {view === 'welcome' && (
                <section className="auth-screen__welcome">
                    <div className="auth-screen__logo-card" aria-hidden="true" />
                    <h1 className="auth-screen__title">Mummy's Daily Card</h1>
                    <p className="auth-screen__subtitle">One calm minute, just for you</p>
                    <p className="auth-screen__promise">
                        22 cards <span>.</span> 22days <span>.</span> 1 minute a day
                    </p>

                    <div className="auth-screen__actions">
                        <button
                            type="button"
                            className="auth-screen__btn auth-screen__btn--primary"
                            onClick={() => switchView('signup')}
                        >
                            Sign up
                        </button>
                        <button
                            type="button"
                            className="auth-screen__btn auth-screen__btn--outline"
                            onClick={() => switchView('login')}
                        >
                            Log in
                        </button>
                    </div>
                </section>
            )}

            {/* 2. Log in & Sign up Screens */}
            {(view === 'login' || view === 'signup') && (
                <section className="auth-screen__form-wrapper">
                    <h1 className="auth-screen__title">
                        {view === 'login' ? 'Welcome back' : 'Create account'}
                    </h1>
                    <p className="auth-screen__subtitle">
                        {view === 'login' ? 'Log in to see your cards'
                            : 'Start your calm 1-minute daily ritual'}
                    </p>

                    <form className="auth-screen__form" onSubmit={handleSubmit} noValidate>

                        {/* Username Field only for sign up */}
                        {view === 'signup' && (
                            <div className="auth-screen__field">
                                <label className="auth-screen__label" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="auth-screen__input"
                                    placeholder="Leona"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                        )}

                        {/* Email Field for Login and Sign up */}
                        <div className="auth-screen__field">
                            <label className="auth-screen__label" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="auth-screen__input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        {/* Password field with Eye */}
                        <div className="auth-screen__field">
                            <label className="auth-screen__label" htmlFor="password">
                                Password
                            </label>
                            <div className="auth-screen__input-wrapper">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="auth-screen__input auth-screen__input--password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete={view === 'login' ? "current-password" : 'new-password'}
                                />
                                <button
                                    type="button"
                                    className="auth-screen__eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Passwrd Field with Eye */}
                        {view === 'signup' && (
                            <div className="auth-screen__field">
                                <label className="auth-screen__label" htmlFor="confirmPassword">
                                    Confirm password
                                </label>
                                <div className="auth-screen__input-wrapper">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="auth-screen__input auth-screen__input--password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className="auth-screen__eye-btn"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="auth-screen__error" role="alert">
                                <svg
                                    className="auth-screen__error-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-screen__btn auth-screen__btn--primary"
                            style={{ marginTop: '0.5rem' }}
                        >
                            {view === 'login' ? 'Log in' : 'Sign up'}
                        </button>
                    </form>

                    <p className="auth-screen__switch">
                        {view === 'login' ? (
                            <>
                                New here?
                                <button
                                    type="button"
                                    className="auth-screen__link"
                                    onClick={() => switchView('signup')}
                                >
                                    Create account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?
                                <button
                                    type="button"
                                    className="auth-screen__link"
                                    onClick={() => switchView('login')}
                                >
                                    Log in
                                </button>
                            </>
                        )}
                    </p>
                </section>
            )}

        </div>
    );
};

export default AuthScreen;