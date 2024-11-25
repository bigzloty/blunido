import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import "../../assets/css/RegistrationDetails.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationDetails = () => {
  const location = useLocation();

  const { email, country, codes } = location.state || ""; // Access email from location state
  const [code, setCode] = useState(codes);
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [shoppingPreference, setShoppingPreference] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeUpdates, setAgreeUpdates] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://blunido-backend.onrender.com/api/auth/signup",
        {
          email,
          code,
          first_name,
          surname,
          password,
          country,
          shoppingPreference,
          dob: `${dob.month}/${dob.day}/${dob.year}`,
          agreeTerms,
          agreeUpdates,
        }
      );
      const message = response.data.message;
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success(message);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      const err = error.response.data.message || "Error Creating An Account";
      toast.error(err);
    }
  };
  return (
    <>
      <div className="registration-details-container">
        <h2>Now let's make you a member.</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Code*</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>First Name*</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Surname*</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Shopping Preference*</label>
            <select
              value={shoppingPreference}
              onChange={(e) => setShoppingPreference(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="input-group">
            <label>Date of Birth*</label>
            <div className="dob-group">
              <input
                type="text"
                placeholder="Day"
                value={dob.day}
                onChange={(e) => setDob({ ...dob, day: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Month"
                value={dob.month}
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Year"
                value={dob.year}
                onChange={(e) => setDob({ ...dob, year: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={agreeUpdates}
              onChange={() => setAgreeUpdates(!agreeUpdates)}
            />
            <label>Sign up for updates on products and offers</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              required
            />
            <label>I agree to the Privacy Policy and Terms of Use</label>
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegistrationDetails;
