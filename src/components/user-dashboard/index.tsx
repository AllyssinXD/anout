import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import AuthService from "../../services/AuthService";

function AccountArea(){
    const authService = new AuthService('http://127.0.0.1:5000/api')

    const [username, setUsername] = useState('');

    useEffect(()=>{
        authService.getMe().then(me=>{
            if(!me) return;
            setUsername(me.getUsername())
        })
    },[])

    return <div className="text-gray-400 flex items-center justify-between mb-5">
                <div className="group user-dropdown-button p-2 rounded-sm w-fit h-10 flex items-center cursor-pointer hover:bg-emerald">
                    <img className="h-6 w-6 rounded-full" src="/images/icons/user-icon-placeholder.jpg"/>
                    <span className="group-hover:text-dark text-[0.8rem] mx-2 w-24">{username}</span>
                    <img className="h-1/2 brightness-[100] invert opacity-60 group-hover:invert-0 group-hover:opacity-100" src="/images/icons/dropdown-icon.png"/>
                </div>
                <div className="group notifications-dropdown-button cursor-pointer w-8 h-8 rounded-sm hover:bg-emerald flex justify-center items-center">
                    <img className="h-1/2 brightness-[100] invert opacity-60 group-hover:invert-0 group-hover:opacity-100" src="/images/icons/bell.svg"/>
                </div>
            </div>
}

function MenuItem({id, label, iconUrl}: {id:string, label: string, iconUrl:string, type?: string}){
    const location = useLocation();
    const navigate = useNavigate();
    
    //Compare location pathname with id, if equals, add class "bg-blue-100"
    //Make sure that the pathname its only the part after the "/"

    return (
            <div 
                onClick={()=>{navigate(id)}}
                id={id}
                className={`p-2 rounded-sm my-2 w-full h-10 flex justify-left items-center cursor-pointer ${location.pathname.replace("/", "") == id ? "bg-emerald text-dark" : "text-white"}`}
            >
                <img className={`${location.pathname.replace("/", "") != id ? "brightness-[100] invert opacity-60" : "brightness-[0]"} h-4 w-5 mr-2`} src={iconUrl}/>
                <span className={`${location.pathname.replace("/", "") != id ? "text-gray-400" : "text-dark"} text-[0.8rem] w-[10rem]`}>{label}</span>
            </div>
        )
}

function PlanBlock(){
    return <div className="h-32 my-5 p-5 flex flex-col justify-center items-center">
            <img className="h-1/2" src="/images/icons/trophy-icon.png"/>
            <span className="text-xs">Your current plan is</span>
            <h3 className="text-md text-amber-600 font-bold">Beta Tester</h3>
        </div>
}

export default function UserDashboard(){
    const menuItemsTop = [
        {id: "recents", label: "Recents", iconUrl: "/images/icons/clock.svg"},
        {id: "all-projects", label: "All Projects", iconUrl: "/images/icons/file.svg"},
        {id: "shared", label: "Shared", iconUrl: "/images/icons/shared.svg"},
    ]

    const menuItemsBottom = [
        {id: "send-feedback", label: "Send Feedback", iconUrl: "/images/icons/like.svg"},
    ]

    useEffect(()=>{
        console.log("AAAAAAAAAAA")
    },[])

    return <div className="flex bg-dark">

        <div className="h-screen p-2">
            <div className="border border-night p-4 rounded-md min-w-64 h-full flex flex-col overflow-y-auto">
                <h3 className="font-medium text-lg text-center mb-10 text-emerald">Anout</h3>
                {
                <AccountArea/>
                }
                {menuItemsTop.map((item, i)=><MenuItem key={i} id={item.id} label={item.label} iconUrl={item.iconUrl}/> )}
                {
                //<PlanBlock/>
                }
                {menuItemsBottom.map((item, i)=><MenuItem key={i} id={item.id} label={item.label} iconUrl={item.iconUrl}/> )}
            </div>
        </div>

        <div className="content w-full">
            <Outlet/>
        </div>
        
    </div>;
}