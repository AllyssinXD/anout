import ToDoCard from "../ToDoCard/index";
import TodoModal from "../ToDoEditModal/index";

import { useState } from "react";

import { useDroppable } from "@dnd-kit/core";
import { ToDoListEntity } from "../../../entities/ToDoListEntity";
import { ToDoEntity } from "../../../entities/ToDoEntity";

interface Props {
    list: ToDoListEntity;
    editList: (id: number, list: ToDoListEntity) => void;
    removeList: (id: number) => void;
}
    
export default function ToDoList({list, editList, removeList}: Props){
    const {isOver, setNodeRef} = useDroppable({
        id: list.getId()
    })
    
    const [newTitle, setNewTitle] = useState(list.getTitle())
    const [selectedTodo, setSelectedTodo] = useState<ToDoEntity | null>(null)
    
    return (
        <div ref={setNodeRef} className={`relative container bg-white p-4 rounded-lg ${isOver ? 'shadow-xl' : 'shadow-md'} z-0 mr-5 w-64 h-fit`}>
            <div className="flex items-center justify-between">
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={() => {
                        list.setTitle(newTitle)
                        editList(list.getId(), list)
                    }}
                    className="w-32 font-bold"
                />
                <button className="border w-10 h-10 border-white-800 p-2 rounded-md block font-bold hover:bg-slate-200" 
                    onClick={()=>{
                        removeList(list.getId())
                    }}>
                        <img style={{transform: "rotate(45deg)"}} src="/images/icons/add.svg"/>
                    </button>
            </div>
            <div className='mt-5 h-5/6 flex flex-col justify-between'>
                {list.getTodos().map((todo) => {
                    return <ToDoCard key={todo.getId()} todo={todo} openModal={() => {setSelectedTodo(todo)}}/>
                })}


                <button className="border mt-5 w-10 border-white-800 p-2 rounded-md m-auto block font-bold hover:bg-slate-200" 
                onClick={()=>{
                    list.addTodo(new ToDoEntity("New Todo"))
                    editList(list.getId(), list)
                }}>
                    <img src="/images/icons/add.svg"/>
                </button>
            </div>

            
            { //Open Edit Modal
            selectedTodo !== null && 
                <TodoModal list={list}
                    todo={selectedTodo}
                    updateTodo={()=>{
                        list.updateTodo(selectedTodo.getId(), selectedTodo)
                        editList(list.getId(), list)
                    }}
                    closeModal={() => {
                        setSelectedTodo(null)
                    }}
                    removeTodo={()=>{
                        list.removeTodo(selectedTodo.getId())
                        editList(list.getId(), list)
                    }}
                />
            }
        </div>
    )
}