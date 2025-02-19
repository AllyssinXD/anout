import { useEffect, useState } from "react";

export default function ForgotPassword(){

    const [email, setEmail] = useState('');

    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(()=>{
        if(!email) setButtonEnabled(false)
        else setButtonEnabled(true)
    },[email])

    return (
        <div>
            <div className="flex justify-center items-center">
                <h3 className="font-medium text-emerald">Forgot my Password</h3>
            </div>
            {sent? <div className="mt-5 text-center"><label className="block text-sm/6 text-gray-300">We sent an email for you with some instructions. Please go check your email. You can close this tab.</label></div>:
            <>
            <div className="mt-5">
                <label htmlFor="email" className="block text-sm/6 text-gray-300">Type your email address : </label>
                <div className="mt-2">
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" id="email" autoComplete="email" required className="block w-full border border-gray-400 rounded-md bg-transparent px-3 py-1.5 text-base text-gray-300 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
            </div>
            <div className="mt-5">
            <button onClick={buttonEnabled?()=>{setSent(true)}:()=>{}} type="submit" className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-dark shadow-xs ${buttonEnabled ? 'bg-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald' : 'bg-green-900 text-black opacity-30'}`}>Recover Account</button>
            </div>
            </>
        }        
        </div>
    )
}