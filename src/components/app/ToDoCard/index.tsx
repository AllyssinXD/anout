import { ToDoEntity } from "../../../entities/ToDoEntity";
import useToDoCard from "../../../hooks/useToDoCard";

export default function ToDoCard(props: {todo: ToDoEntity, openModal: (todo: ToDoEntity)=>void}){
    const {listeners, attributes, setNodeRef, handleClick, setIsHovered, style,textStyle} = useToDoCard(props)

    return <>
        <div ref={setNodeRef} className={`todocard relative z-40 group bg-white w-44 min-h-10 mt-2 rounded-md border m-auto border-white-500`} style={style} {...attributes} {...listeners} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className="z-10 w-1 h-full absolute top-0 left-0 rounded-md" style={{backgroundColor: props.todo.getColor()}}></div>
            <h3 className="z-10 p-2 text-sm flex cursor-pointer group-hover:text-white" style={textStyle}>{props.todo.getTitle()}</h3>
        </div> 
    </>
}