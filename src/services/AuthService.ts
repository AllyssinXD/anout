import axios from "axios";

class AuthService {
    constructor(private baseUrl: string){}

    async tryLogin(email : string, password: string){
        const res = await axios.post(`${this.baseUrl}/auth/login`, {email, password}, {
            withCredentials: true
        });
        
        return res.data.success;
    }

    async tryRegister(username: string, email: string, password: string){
       const res = await axios.post(`${this.baseUrl}/auth/register`, {username, email, password}, {
        withCredentials: true
       })
       
       return res.data.success;
    }

    async getMe(){
        const res = await axios.get(`${this.baseUrl}/auth/me`, {
            withCredentials: true
        });

        if(res.status == 400) {
            console.log(res.data.message);
            return
        }

        return res.data.user;
    }
}

export default AuthService;