import { useState } from "react";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";

const Login = () => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("error");

  const { login, isLoading, error } = useLogin("/api/users/login");

  const validateForm = () => {
    // Email validation
    if (!email.value) {
      setNotification("Email is required");
      setNotificationType("error");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setNotification("Please enter a valid email address");
      setNotificationType("error");
      return false;
    }
    
    // Password validation
    if (!password.value) {
      setNotification("Password is required");
      setNotificationType("error");
      return false;
    }
    
    if (password.value.length < 6) {
      setNotification("Password must be at least 6 characters long");
      setNotificationType("error");
      return false;
    }
    
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const success = await login({
      email: email.value,
      password: password.value
    });
    
    if (success) {
      setNotification("Login successful! Redirecting...");
      setNotificationType("success");
      
      // Short delay before redirecting to show the success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else if (error) {
      setNotification(error);
      setNotificationType("error");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <Notification 
        message={notification} 
        type={notificationType} 
        setMessage={setNotification} 
      />
      <form onSubmit={handleFormSubmit}>
        <label>Email:</label>
        <input 
          type={email.type}
          value={email.value}
          onChange={email.onChange}
          required
        />
        
        <label>Password:</label>
        <input 
          type={password.type}
          value={password.value}
          onChange={password.onChange}
          required
        />
        
        <button disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account yet? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
