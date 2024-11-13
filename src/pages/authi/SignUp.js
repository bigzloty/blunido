import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/SignUp.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    // Fetch countries when component mounts
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countryList = response.data.map(country => ({
                    name: country.name.common,
                    code: country.cca2
                }));
                setCountries(countryList);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    // Handle sign-up and navigate to registration details page
    const handleSignUp = async (e) => {
        e.preventDefault();
        const code = Math.random().toString(36).slice(-8);
        toast.info(`Your registration Code is ${code}`)
        handleContinue(code)
    };

    // Navigate to registration details page with email in state
    const handleContinue = (codes) => {
        navigate('/register-details', {
            state: {
                email, country , codes
            }
        });
    };

    return (
        <div className="signup-container">
            {<div className="logo-container">

                <h1>Blunido</h1>
            </div>}
            <h2>Enter your email to join us or sign in.</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignUp}>
                <div className="input-group">
                    <label>Country</label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                        <option value="">Select your country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Continue</button>
                <p className="privacy-policy">
                    By continuing, I agree to Blunido's
                    <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>.
                </p>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SignUp;