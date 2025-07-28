import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../service/userApi"; // Import API functions
import "../styles/SignUpPage.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",

    username: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle login input
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginInfo.username || !loginInfo.password) {
      setError("Please enter username and password.");
      return;
    }
    try {
      setError("");
      const data = await loginUser(loginInfo);
      // Assuming API returns user object and token
      localStorage.setItem("user", JSON.stringify(data.user)); // ✅ consistent with your cart code
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage-changed")); // Notify Nav
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  // Handle sign up input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };



  // Handle sign up submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = userInfo;

    if (!email || !username || !password) {
      setError("Username, email and password are required!");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);


  try {
    setError("");
    const data = await registerUser(formData);
    localStorage.setItem("userProfile", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    window.dispatchEvent(new Event("storage-changed"));
    navigate("/profile");
  } catch (err) {
    setError(err.response?.data?.error || "Sign up failed.");
  }
};

  // Swap between login and sign up forms
  const handleSwap = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <div className={`auth-split-container${isSignUp ? " swapped" : ""}`}>
      <div className="auth-side left-side">
        {!isSignUp ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2>Log In</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginInfo.username}
              onChange={handleLoginChange}
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={handleLoginChange}
              className="signup-input"
            />
            <button className="submit-btn" type="submit">
              Log In
            </button>
            <p className="swap-text">
              Don't have an account?{" "}
              <span className="swap-link" onClick={handleSwap}>
                Sign up
              </span>
            </p>
          </form>
        ) : (
          <div className="auth-image-side">
            <img src="https://annieandersonstore.com/cdn/shop/files/BookBrushImage3D-Hardcover-Three-Fourths-vxfjtkcsg.png?v=1711383179" alt="Website visual" className="auth-img" />
          </div>
        )}
      </div>
      <div className="auth-side right-side">
        {isSignUp ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userInfo.username}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="signup-input"
              style={
                {
                  color:'#ddd',
                  WebkitTextFillColor: '#000',
                  background: '#fafafa',
                  outline: 'none',
                  borderRadius: '6px'
                }
              }
            />

            <button className="submit-btn" type="submit">
              Sign Up
            </button>
            <p className="swap-text">
              Already have an account?{" "}
              <span className="swap-link" onClick={handleSwap}>
                Log in
              </span>
            </p>
          </form>
        ) : (
          <div className="auth-image-side">
            <img src="https://annieandersonstore.com/cdn/shop/files/BookBrushImage3D-Hardcover-Three-Fourths-vxfjtkcsg.png?v=1711383179" alt="Website visual" className="auth-img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
