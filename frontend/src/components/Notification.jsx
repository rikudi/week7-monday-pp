import { useEffect } from 'react';

const Notification = ({ message, type, setMessage }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) return null;

  const style = {
    padding: '10px 20px',
    margin: '20px 0',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'white',
    backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification; 