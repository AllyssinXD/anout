import { useNavigate } from "react-router";
import AuthService from "../../../services/AuthService";
import { useEffect, useState } from "react";

export default function Register(){
    const navigate = useNavigate();

    const authService = new AuthService("http://127.0.0.1:5000/api");

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [buttonEnabled, setButtonEnabled] = useState(false);

    const [error, setError] = useState('');

    const makeSignUp = ()=>{
        authService.tryRegister(username, email, password).then(({success, message})=>{
          if(success) authService.tryLogin(email, password).then(success=>{
            if(success) navigate('/')
          })

          else setError(message);
        })
    }

    useEffect(()=>{
        if(password != confirmPass || !password) setButtonEnabled(false);
        else setButtonEnabled(true);
    },[password,confirmPass])

    return (<div className="space-y-6">
        {error ? <div className=" p-2 rounded-md bg-red-200">
            <label className="block text-sm/6 font-medium text-gray-900">{error}</label>
        </div> : null}
        <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
            <div className="mt-2">
            <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" name="username" id="username" autoComplete="username" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
            </div>
        </div>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
          <input onChange={(e)=>setConfirmPass(e.target.value)} value={confirmPass} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button onClick={buttonEnabled ? makeSignUp : ()=>{}} type="submit" className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs ${buttonEnabled ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'bg-gray-300'}`}>Sign up</button>
      </div>
    </div>);
}