import useToDo from "../../hooks/useToDo"

import ToDoList from "../ToDoList"
import DNDWrapper from "../DNDWrapper"
import React, { createContext, useContext, useEffect, useState } from "react";
import DraggingTodo from "../../interfaces/DraggingToDoInterface";

const DraggingContext = createContext<React.Dispatch<React.SetStateAction<DraggingTodo | null>> | null>(null);
export const useDraggingContext = () => useContext(DraggingContext);

export function ToDoApp(){
    
    const [draggingToDo, setDraggingToDo] = useState<DraggingTodo | null>(null);
    const {lists, setLists, addList, editList} = useToDo();

    return (
      <DNDWrapper lists={lists} setLists={setLists}>
        <DraggingContext.Provider value={setDraggingToDo}>
          {lists.map((list) => {
              return <ToDoList key={list.getId()} list={list} editList={editList}/>
          })}
          <button className='h-16 border border-white-800 bg-white rounded-md w-40 block font-bold hover:bg-slate-200' onClick={addList}>Add List</button>
            {draggingToDo && (draggingToDo.getX() != 0 && draggingToDo.getY() != 0) ? 
            <div className={`top-0 right-0 absolute bg-white w-44 min-h-10 mt-2 rounded-md border border-white-500`} style={{top: draggingToDo.getY(), left: draggingToDo.getX()}}>
            <div className="w-1 h-full absolute top-0 left-0 rounded-md" style={{backgroundColor: draggingToDo.color}}></div>
            <h3 className="p-2 text-sm font-bold flex cursor-pointer">{draggingToDo.title}</h3>
            </div> 
           : null}
        </DraggingContext.Provider>
      </DNDWrapper>
    )
    
}