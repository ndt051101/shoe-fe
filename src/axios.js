import axios from 'axios';
import { dispatch } from './redux';
import { processLogout } from './store/actions';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});




instance.interceptors.response.use(
    (response) => {
        // const { data } = response;
        return response.data;
    }, 
    (error) => {
        if (error.response.status === 401) {
            console.log('Nhan duoc loi 401')
            localStorage.removeItem('token')
            dispatch(processLogout())
        }
        return Promise.reject(error);
    }
);

export default instance;
