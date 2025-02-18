import { useState } from "react";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router";

export default function Login(){
    const navigate = useNavigate();

    const authService = new AuthService("http://127.0.0.1:5000/api");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const makeLogin = ()=>{
        authService.tryLogin(email, password).then(({success, message})=>{
          if(success) navigate('/');
          else setError(message)
        })
    }

    return (<div className="space-y-6">
      {error ? <div className=" p-2 rounded-md bg-red-200">
            <label className="block text-sm/6 font-medium text-gray-900">{error}</label>
        </div> : null}
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button onClick={makeLogin} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
      <div className="flex justify-center items-center">
      <label>Dont have and account? <a className="hover:cursor-pointer font-medium text-indigo-600" onClick={()=>navigate('/register')}>Click Here</a></label>
      </div>
    </div>);
}