import { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ToDoEntity } from "../../entities/ToDoEntity";

export default function ToDoCard(props: {todo: ToDoEntity, openModal: (todo: ToDoEntity)=>void}){
    const [dragging, setDragging] = useState(false)
    const {listeners, attributes, setNodeRef, transform} = useDraggable({
        id: props.todo.getId(),
    })
    
    const rgbColor = props.todo.getColor().match(/\d+/g);
    const [colorWhite, setColorWhite] = useState(false)
    
    const [isHovered, setIsHovered] = useState(false);

    function calculateTextColor(rgbColor: RegExpMatchArray | null): boolean {
        //Return true if the color is bright enough to be black text
        if (!rgbColor) {
            return false;
        }

        const [r, g, b] = rgbColor.map(Number);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        return brightness > 125 ? false : true;
    }

    const style = {
        ["--color" as any]: props.todo.getColor(),
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        zIndex: '10'
    };

    const textStyle = {
        color: isHovered ? (colorWhite? 'rgb(255,255,255)' : 'rgb(0,0,0)') : 'rgb(0,0,0)'
    };

    const handleDragStart = ()=>setDragging(true)
    const handleDragEnd = ()=>setDragging(false)
    const handleClick = ()=>{
        if(!dragging){
            props.openModal(props.todo)
        }
    }

    useEffect(()=>{
        setColorWhite(calculateTextColor(rgbColor))
    }, [])
    
    return <>
        <div ref={setNodeRef} className={`todocard ${transform? 'absolute' : 'relative'} z-40 group bg-white w-44 min-h-10 mt-2 rounded-md border m-auto border-white-500`} style={style} {...attributes} {...listeners} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            onDragEnter={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="z-10 w-1 h-full absolute top-0 left-0 rounded-md" style={{backgroundColor: props.todo.getColor()}}></div>
            <h3 className="z-10 p-2 text-sm font-bold flex cursor-pointer group-hover:text-white" style={textStyle}>{props.todo.getTitle()}</h3>
        </div>
    </>
}