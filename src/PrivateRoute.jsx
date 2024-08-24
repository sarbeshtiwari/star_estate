import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = Cookies.get('authToken');
    const expiryTime = Cookies.get('expiryTime');
    const isTokenExpired = !token || Date.now() > expiryTime;

    if (isTokenExpired) {
        Cookies.remove('authToken');
        Cookies.remove('expiryTime');
        return <Navigate to="/login" replace />;
    }

    return Component;
};

export default PrivateRoute;
