import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = `https://star-estate-api.onrender.com/auth`

export const verifyLogin = async (email, password) => {
  console.log('called')
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    console.log(response);
    if (response.data.success) {
      // Save the token or handle successful login
      console.log('Login successful:', response.data.token);
      Cookies.set('authToken', response.data.token, { expires: 60 / 1440 }); // Expires in 10 minutes (1440 minutes in a day)
      // Cookies.set('expiryTime', Date.now() + expiresIn * 1000, { expires: 10 / 1440 });
      return response.data;
    } else {
      console.error('Login failed:', response.data.message); 
    }
  } catch (error) {
    console.error('API error:', error.message);
  }
};



export const getStoredToken = () => {
  const token = Cookies.get('authToken');
  const expiryTime = Cookies.get('expiryTime');

  if (token && expiryTime) {
      const isTokenValid = Date.now() < parseInt(expiryTime);
      return isTokenValid ? token : null;
  }
  return null;
};