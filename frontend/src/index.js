import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <GoogleOAuthProvider clientId="760337282126-sbuduv68t83fh6mlposegovfikic3u5c.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>

);