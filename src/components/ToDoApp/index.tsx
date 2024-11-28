import { useState } from "react"
import { ToDoListEntity } from "../../entities/ToDoListEntity"
import ToDoList from "../ToDoList"
import { DNDWrapper } from "../DNDWrapper"

export function ToDoApp(){
    
    const [lists, setLists] = useState<ToDoListEntity[]>([])

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

    return (
      <DNDWrapper lists={lists} setLists={setLists}>
          {lists.map((list) => {
              return <ToDoList key={list.getId()} list={list} editList={editList}/>
          })}
          <button className='h-16 border border-white-800 bg-white rounded-md w-40 block font-bold hover:bg-slate-200' onClick={addList}>Add List</button>
      </DNDWrapper>
    )
    
}