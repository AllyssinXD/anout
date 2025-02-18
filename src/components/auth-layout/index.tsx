import { Outlet } from "react-router";

export default function AuthLayout(){
    return <div className="h-screen w-screen bg-gray-400 flex justify-center items-center">
        <div className="p-5 h-fit min-h-24 w-96 rounded-md bg-white">
        <Outlet/>
        </div>
    </div>
}