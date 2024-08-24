import React from 'react';
import { useNavigate} from 'react-router-dom'; 

const LogoutComponent = () => {
  const navigator = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('success');
    localStorage.removeItem('username');
    localStorage.removeItem('useridno');

    // Redirect to login page
    navigator('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutComponent;
