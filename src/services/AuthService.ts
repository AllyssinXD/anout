import axios, { AxiosError } from "axios";

class AuthService {
    constructor(private baseUrl: string){}

    async tryLogin(email : string, password: string){
        try{
            const res = await axios.post(`${this.baseUrl}/auth/login`, {email, password}, {
                withCredentials: true
            });
            
            return res.data;
        } catch(err){
            const e = err as AxiosError;
            return e.response?.data;
        }
    }

    async tryRegister(username: string, email: string, password: string){
        try{
            const res = await axios.post(`${this.baseUrl}/auth/register`, {username, email, password}, {
                withCredentials: true
            })

            return res.data;
        }
       
        catch(err){
            const e = err as AxiosError;
            return e.response?.data;
        }
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