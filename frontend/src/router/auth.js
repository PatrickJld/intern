import axios from "axios";

async function auth({ next, router }) {
    try {
        const {status, data} = await axios.get("/auth/user")
    } catch (error) {
        router.push('/');
    }
    
    return next();
}

async function adminAuth({ next, router }) {
    try {
        const {status, data} = await axios.get("/auth/admin")
    } catch (error) {
        router.push('/');
    }
    
    return next();
}

export { auth, adminAuth }