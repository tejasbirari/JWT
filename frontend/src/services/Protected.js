import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from "../services/toast/toastConfig";

const Protected = ({children}) => {

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('TOKEN');
        const isAuthenticated = !!token;
        console.log(isAuthenticated);


        if(!isAuthenticated){
            toast.error("Please Login", toastError)
            navigate('/');
            return;
        }

        // Check token expiry
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if(decodedToken.exp < currentTime){
                localStorage.removeItem('TOKEN');
                navigate('/');
            }
        } catch (error) {
            navigate('/')
        }

    }, [navigate])
    

  return children
}

export default Protected