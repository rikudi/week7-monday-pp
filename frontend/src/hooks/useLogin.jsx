import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function useLogin(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    
    const login = async (object) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(object),
            });
            
            const json = await response.json();
        
            if (!response.ok) {
              setError(json.error);
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
            setError('Network error. Please try again.');
            setIsLoading(false);
            return false;
        }
    };

    return { login, isLoading, error };
}