import { useState } from "react"
import { ToDoListEntity } from "../entities/ToDoListEntity"
import { ToDoEntity } from "../entities/ToDoEntity";

export default function useToDo(){
    const [lists, setLists] = useState<ToDoListEntity[]>([])
    const [draggingToDo, setDraggingToDo] = useState<ToDoEntity | null>(null);

    const addList = ()=>{
      setLists([...lists, new ToDoListEntity(Date.now(), "New List", [])])
    }

    const editList = (id: number, list: ToDoListEntity)=>{
        const newLists = lists.map((l) => {
          if(l.getId() === id){
            return list
          }
          return l
        })
        setLists(newLists)
    }

    return {lists, setLists, addList, editList, draggingToDo, setDraggingToDo}
}