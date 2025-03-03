import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Ensure all fields are properly formatted
      const formattedData = {
        name: object.name.trim(),
        email: object.email.trim(),
        password: object.password,
        phone_number: object.phone_number.trim(),
        gender: object.gender.trim(),
        date_of_birth: object.date_of_birth,
        membership_status: object.membership_status.trim()
      };
      
      console.log("Sending signup data:", formattedData);
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
      
      const json = await response.json();
      console.log("Signup response:", json);

      if (!response.ok) {
        const errorMessage = json.error || "Signup failed. Please try again.";
        console.error("Signup error:", errorMessage);
        setError(errorMessage);
        setIsLoading(false);
        return false;
      }
      
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      
      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });
      
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error("Signup exception:", err);
      setError('Network error. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  return { signup, isLoading, error };
}
