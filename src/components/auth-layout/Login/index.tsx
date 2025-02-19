import { useEffect, useState } from "react";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router";

export default function Login(){
    const navigate = useNavigate();

    const authService = new AuthService("http://127.0.0.1:5000/api");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [buttonEnabled, setButtonEnabled] = useState(false);

    const [error, setError] = useState('');

    const makeLogin = ()=>{
        authService.tryLogin(email, password).then(({success, message})=>{
          if(success) navigate('/');
          else setError(message)
        })
    }

    useEffect(()=>{
      if(!email || !password) setButtonEnabled(false);
      else setButtonEnabled(true)
    },[email, password])

    return (<div className="space-y-6">
      <div className="flex justify-center items-center"><h3 className="font-medium text-emerald">Sign up</h3></div>
      {error ? <div className=" p-2 rounded-md bg-red-200">
            <label className="block text-sm/6 font-medium text-gray-900">{error}</label>
        </div> : null}
      <div>
        <label htmlFor="email" className="block text-sm/6 text-gray-300">Email address</label>
        <div className="mt-2">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" id="email" autoComplete="email" required className="block w-full border border-gray-300 bg-transparent text-gray-300 rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 text-gray-300">Password</label>
          <div className="text-sm">
            <a onClick={()=>navigate("/forgot-my-password")} className="hover:cursor-pointer font-semibold text-emerald">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full border border-gray-300 rounded-md bg-transparent px-3 py-1.5 text-base text-gray-300 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button onClick={buttonEnabled?makeLogin:()=>{}} type="submit" className=
        {`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-dark shadow-xs ${buttonEnabled ? 'bg-crimson focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson' : 'bg-crimson text-black opacity-30'}`}>Sign in</button>
      </div>
      <div className="flex justify-center items-center">
      <label className="text-gray-300">Dont have and account? <a className="hover:cursor-pointer text-emerald" onClick={()=>navigate('/register')}>Click Here</a></label>
      </div>
    </div>);
}