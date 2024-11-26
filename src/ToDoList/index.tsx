import ToDoCard from "../ToDoCard/index";
import TodoModal from "../ToDoEditModal/index";

import { useState } from "react";

import { useDroppable } from "@dnd-kit/core";
import { TodoList } from "../TodoList";
import { Todo } from "../Todo";

interface Props {
    list: TodoList;
    editList: (id: number, list: TodoList) => void;
}
    
export default function ToDoList({list, editList}: Props){
    const {isOver, setNodeRef} = useDroppable({
        id: list.getId()
    })
    
    const [newTitle, setNewTitle] = useState(list.getTitle())
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
    
    const style = {
        transform: isOver ? 'scale(1.1)' : 'scale(1)',
    }

    return (
        <div ref={setNodeRef} className={`relative container bg-white p-5 rounded-sm ${isOver ? 'shadow-xl' : 'shadow-md'} z-0 mr-5 w-64 min-h-5/6 max-h-96`} style={style}>
            <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => {
                    list.setTitle(newTitle)
                    editList(list.getId(), list)
                }}
                className="font-bold"
            />
            <div className='pt-4 rounded-lg  mt-5 h-5/6 overflow-y-scroll'>
                {list.getTodos().map((todo) => {
                    return <ToDoCard key={todo.getId()} todo={todo} openModal={() => {setSelectedTodo(todo)}}/>
                })}
                <button className="border border-white-800 p-2 rounded-md m-auto w-40 block mt-10 mb-5 font-bold hover:bg-slate-200" 
                onClick={()=>{
                    list.addTodo(new Todo("New Todo"))
                    editList(list.getId(), list)
                }}>Create</button>
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