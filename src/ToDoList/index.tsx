import ToDoCard from "../ToDoCard/index";
import TodoModal from "../ToDoEditModal/index";

import { useState } from "react";

import { ToDoInterface } from "../interfaces";
import { ListInterface } from "../interfaces";

import { useDroppable } from "@dnd-kit/core";

interface ManagementFunctions {
    addList: () => void;
    editList: (id: number, list: ListInterface) => void;
    removeList: (id: number) => void;

    updateTodo: (list: ListInterface, id: number, todo: ToDoInterface) => void;
    removeTodo: (list: ListInterface, id: number) => void;
    addTodo: (list: ListInterface) => void;
}

    
export default function ToDoList(props: {list: ListInterface, functions: ManagementFunctions}){
    const {isOver, setNodeRef} = useDroppable({
        id: props.list.id
    })
    
    const [newTitle, setNewTitle] = useState(props.list.title)
    const [selectedTodo, setSelectedTodo] = useState<ToDoInterface | null>(null)
    
    const style = {
        transform: isOver ? 'scale(1.1)' : 'scale(1)',
    }

    return (
        <div ref={setNodeRef} className={`relative container bg-white p-5 rounded-sm ${isOver ? 'shadow-xl' : 'shadow-md'} z-0 mr-5 w-64 min-h-5/6 max-h-96`} style={style}>
            <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => props.functions.editList(props.list.id, { ...props.list, title: newTitle })}
                className="font-bold"
            />
            <div className='pt-4 rounded-lg  mt-5 h-5/6 overflow-y-scroll'>
                {props.list.todos.map((todo) => {
                    return <ToDoCard todo={todo} abrirModal={() => {setSelectedTodo(todo)}}/>
                })}
                <button className="border border-white-800 p-2 rounded-md m-auto w-40 block mt-10 mb-5 font-bold hover:bg-slate-200" onClick={()=>props.functions.addTodo(props.list)}>Create</button>
            </div>
            {selectedTodo !== null && <TodoModal list={props.list} todo={selectedTodo} atualizarTodo={props.functions.updateTodo} fecharModal={() => {setSelectedTodo(null)}} deletarTodo={props.functions.removeTodo}></TodoModal>}
        </div>
    )
}