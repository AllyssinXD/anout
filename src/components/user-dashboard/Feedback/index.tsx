import { useState } from "react"
import { useNavigate } from "react-router";

export default function Feedback(){
    const navigate = useNavigate()
    const [sended, setSended] = useState(false);

    const sendForm = <div className="h-full w-full bg-night text-silver p-10 flex flex-col rounded-md justify-evenly items-center">
                        <h2 className="text-xl font-medium w-full text-center">Send your feedback</h2>
                        <p className="w-full text-center">Send your feedback to the development team to help us improve the app!</p>
                        <textarea className="w-full p-2 bg-night h-56 border rounded-md border-emerald"></textarea>
                        <button className="w-full p-2 bg-crimson text-white rounded-md" onClick={()=>{setSended(true)}}>Send</button>
                    </div>

    const thankYouScreen = <div className="h-full w-full p-10 flex flex-col justify-center items-center">
                                <h2 className="text-xl w-full text-center text-silver mb-10 ">Thank you for the support!</h2>
                                <div className="w-full flex justify-center">
                                <button className="p-2 mr-10 w-48 bg-crimson text-white rounded-md" onClick={()=>{setSended(false)}}>Send Another</button>
                                <button className="p-2 w-48 bg-emerald text-dark rounded-md" onClick={()=>navigate('/all-projects')}>Go to Projects</button>
                                </div>
                            </div>

    return sended ? thankYouScreen : sendForm
}