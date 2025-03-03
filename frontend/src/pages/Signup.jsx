import { useState } from "react";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";

const Signup = () => {
  const navigate = useNavigate();
  const name = useField("text");  
  const email = useField("email");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const membershipStatus = useField("text");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("error");

  const { signup, isLoading, error } = useSignup("/api/users/signup");

  const validateForm = () => {
    // Name validation
    if (!name.value || name.value.trim() === '') {
      setNotification("Name is required");
      setNotificationType("error");
      return false;
    }
    
    // Email validation
    if (!email.value || email.value.trim() === '') {
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
    if (!password.value || password.value.trim() === '') {
      setNotification("Password is required");
      setNotificationType("error");
      return false;
    }
    
    if (password.value.length < 6) {
      setNotification("Password must be at least 6 characters long");
      setNotificationType("error");
      return false;
    }
    
    // Phone number validation - required by backend
    if (!phoneNumber.value || phoneNumber.value.trim() === '') {
      setNotification("Phone number is required");
      setNotificationType("error");
      return false;
    }
    
    // Gender validation - required by backend
    if (!gender.value || gender.value.trim() === '') {
      setNotification("Gender is required");
      setNotificationType("error");
      return false;
    }
    
    // Date of Birth validation - required by backend
    if (!dateOfBirth.value || dateOfBirth.value.trim() === '') {
      setNotification("Date of Birth is required");
      setNotificationType("error");
      return false;
    }
    
    // Membership Status validation - required by backend
    if (!membershipStatus.value || membershipStatus.value.trim() === '') {
      setNotification("Membership Status is required");
      setNotificationType("error");
      return false;
    }
    
    // All validations passed
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log("Form data:", {
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value
    });
    
    const success = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value
    });

    if (success) {
      setNotification("Signup successful! Redirecting...");
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
      <h2>Signup</h2>
      <Notification 
        message={notification} 
        type={notificationType} 
        setMessage={setNotification} 
      />
      <form onSubmit={handleFormSubmit}>
        <label>Name: <span className="required">*</span></label>
        <input 
          type={name.type}
          value={name.value}
          onChange={name.onChange}
          required
        />
        
        <label>Email: <span className="required">*</span></label>
        <input 
          type={email.type}
          value={email.value}
          onChange={email.onChange}
          required
        />
        
        <label>Password: <span className="required">*</span></label>
        <input 
          type={password.type}
          value={password.value}
          onChange={password.onChange}
          required
        />
        
        <label>Phone Number: <span className="required">*</span></label>
        <input 
          type={phoneNumber.type}
          value={phoneNumber.value}
          onChange={phoneNumber.onChange}
          required
        />
        
        <label>Gender: <span className="required">*</span></label>
        <select 
          value={gender.value}
          onChange={gender.onChange}
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        
        <label>Date of Birth: <span className="required">*</span></label>
        <input 
          type={dateOfBirth.type}
          value={dateOfBirth.value}
          onChange={dateOfBirth.onChange}
          required
        />
        
        <label>Membership Status: <span className="required">*</span></label>
        <select 
          value={membershipStatus.value}
          onChange={membershipStatus.onChange}
          required
        >
          <option value="">Select status</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
        </select>
        
        <button disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
