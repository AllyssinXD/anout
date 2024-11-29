import { useState } from "react"

export default function Feedback(){
    const [sended, setSended] = useState(false);

    const sendForm = <div className="h-full w-full p-10 flex flex-col justify-evenly items-center">
                        <h2 className="text-xl w-full text-center">Send your feedback</h2>
                        <p className="w-full text-center">Send your feedback to the development team to help us improve the app!</p>
                        <textarea className="w-full h-56 border"></textarea>
                        <button className="w-full p-2 bg-indigo-600 text-white rounded-md" onClick={()=>{setSended(true)}}>Send</button>
                    </div>

    const thankYouScreen = <div className="h-full w-full p-10 flex flex-col justify-center items-center">
                                <h2 className="text-xl w-full text-center mb-10 ">Thank you for the support!</h2>
                                <div className="w-full flex justify-center">
                                <button className="p-2 mr-10 bg-indigo-600 text-white rounded-md" onClick={()=>{setSended(false)}}>Send Another</button>
                                <button className="p-2 bg-indigo-600 text-white rounded-md">Go to Projects</button>
                                </div>
                            </div>

    return sended ? thankYouScreen : sendForm
}