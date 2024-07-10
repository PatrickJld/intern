import axios from "axios";
import router from "../router";
import _Socket from "./_Socket";

let url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;

// let refresh = false;

function clearCookie(){
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "data_registrant=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

let accessToken = undefined;

function setAccessToken(accToken) {
    accessToken = accToken;
    _Socket.disconnect();
    _Socket.io.opts.query = { acctoken: accessToken };
}

const publicClient = axios.create({
    baseURL: url,
    withCredentials: true,
});

axios.interceptors.request.use(async (req) => {
    if (!accessToken) { 
        try {
            const {status, data} = await publicClient.post('/auth/refresh');
            setAccessToken(data.token);
        } catch (error) {
            clearCookie();
            router.push('/');
        }
    }

    if (req.headers) {
        req.headers["Authorization"] = "Bearer " + accessToken;
    }
    return req;
});

axios.interceptors.response.use(resp => resp, async error => {
    const request = error.config;
    if(error.response.status === 401 && !request._retry) {
        request._retry = true;
        try {
            const {status, data} = await publicClient.post('/auth/refresh');
            setAccessToken(data.token);
            return error
        } catch (error) {
            clearCookie();
            router.push('/');
        }
    }
    
    if(error.response.data == "Admin Not Authenticated"){
        router.push('/dashboard')
    }else if(error.response.data == "Session Expired"){
        clearCookie();
        router.push('/')
    }
    return error;

    // if(error.response.status === 401 && !refresh) {
    //     refresh = true;
    //     const {status, data} = await axios.post('/auth/refresh', {}, {
    //         withCredentials: true
    //     });

    //     if (status == 200) {
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    //         return axios(error.config);
    //     }else{
    //         clearCookie();
    //         router.push('/');
    //     }
    // }
    
    // if(error.response.data == "Admin Not Authenticated"){
    //     router.push('/dashboard')
    // }else if(error.response.data == "Session Expired"){
    //     clearCookie();
    //     router.push('/')
    // }

    // refresh = false;
    // return error;
})

export { publicClient, setAccessToken };