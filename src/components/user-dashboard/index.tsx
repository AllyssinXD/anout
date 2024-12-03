import { useState } from "react";
import Feedback from "./Feedback";
import AllProjects from "./AllProjects";

function AccountArea(){
    return <div className="userAccount p-4 flex items-center justify-between">
                <div className="user-dropdown-button p-1 rounded-sm w-fit h-8 flex items-center cursor-pointer hover:bg-cyan-100">
                    <img className="h-full rounded-full" src="/images/icons/user-icon-placeholder.jpg"/>
                    <span className="text-sm mx-2">Alisson Santos Silva</span>
                    <img className="h-1/2 opacity-80" src="/images/icons/dropdown-icon.png"/>
                </div>
                <div className="notifications-dropdown-button cursor-pointer w-8 h-8 rounded-sm hover:bg-cyan-100 flex justify-center items-center">
                    <img className="h-1/2 opacity-80" src="/images/icons/bell.svg"/>
                </div>
            </div>
}

function MenuItem({id, label, iconUrl, actions, onClick, selectedItem}: {id:string, label: string, iconUrl:string, type?: string, actions?: Function[], onClick: Function, selectedItem: string | null}){
    return <div onClick={(e)=>{
        onClick(e.currentTarget.id)
        if(actions){
            actions.forEach(action => {
                action()
            });
        }
    }} id={id} className={`p-1 px-4 rounded-sm w-full h-8 flex items-center cursor-pointer hover:bg-gray-100 ${selectedItem == id? "bg-cyan-100" : ""}`}>
            <img className="h-4/5 opacity-80 mr-4" src={iconUrl}/>
            <span className="text-xs mx-2">{label}</span>
        </div>
}

function PlanBlock(){
    return <div className="h-32 my-5 border-y p-5 flex flex-col justify-center items-center">
            <img className="h-1/2" src="/images/icons/trophy-icon.png"/>
            <span className="text-xs">Your current plan is</span>
            <h3 className="text-md text-amber-600 font-bold">Beta Tester</h3>
        </div>
}

export default function UserDashboard({setProject}:{setProject: Function}){
    const [selectedItem, setSelectedItem] = useState<string | null>(null)
    const [activeContent, setActiveContent] = useState<string | null>(null)

    const menuItemsTop = [
        {label: "Recents", iconUrl: "/images/icons/clock.svg", actions: [()=>{setActiveContent("")}]},
        {label: "All Projects", iconUrl: "/images/icons/file.svg", actions: [()=>{setActiveContent("all-projects")}]},
        {label: "Shared", iconUrl: "/images/icons/shared.svg", actions: [()=>{setActiveContent("")}]},
    ]

    const menuItemsBottom = [
        {label: "Send Feedback", iconUrl: "/images/icons/like.svg", actions: [()=>{setActiveContent("feedback")}]},
    ]

    const handleMenuItemClicked = (id: string)=>{
        setSelectedItem(id)
    }

    return <div className="flex">
        <div className="sideMenu min-w-72 h-screen flex flex-col border overflow-y-auto">
            <AccountArea/>
            {menuItemsTop.map((item, i)=><MenuItem onClick={handleMenuItemClicked} key={i} id={(i).toString()} label={item.label} iconUrl={item.iconUrl} selectedItem={selectedItem} actions={item.actions}/> )}
            <PlanBlock/>
            {menuItemsBottom.map((item, i)=><MenuItem onClick={handleMenuItemClicked} key={i} id={(i + menuItemsTop.length).toString()} label={item.label} iconUrl={item.iconUrl} selectedItem={selectedItem} actions={item.actions}/> )}
        </div>
        <div className="content w-full">
            {activeContent == "feedback" ? <Feedback/> : null}
            {activeContent == "all-projects" ? <AllProjects setProject={setProject}/> : null}
        </div>
    </div>;
}