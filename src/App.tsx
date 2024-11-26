import { useState } from 'react'

import ToDoList from './ToDoList/index'

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { TodoList } from './TodoList';
import { TodoService } from './TodoService';

function App() {
  const sensors = useSensors(
      useSensor(PointerSensor, {
          activationConstraint: {
              delay: 120, // 250ms de espera antes de ativar o arrasto
              tolerance: 5, // Tolerância de 5px antes de cancelar o arrasto
          },
      })
  );

  const [lists, setLists] = useState<TodoList[]>([])

  const addList = ()=>{
    setLists([...lists, new TodoList(Date.now(), "New List", [])])
  }

  const editList = (id: number, list: TodoList)=>{
    const newLists = lists.map((l) => {
      if(l.getId() === id){
        return list
      }
      return l
    })
    setLists(newLists)
  }
  
  function handleDragEnd({active, over} : DragEndEvent){
    if(!active || !over) return

    const id = Number.parseInt(active.id.toString());
    const overId = Number.parseInt(over.id.toString())

    const todo = TodoService.getTodoById(lists, id)
    const fromList = TodoService.getListFromTodo(lists, todo!)
    const toList = TodoService.getListById(lists, overId)

    if(!todo || !fromList || !toList) return

    TodoService.transferTodo(fromList, toList, todo)
    setLists([...lists])
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {lists.map((list) => {
          return <ToDoList key={list.getId()} list={list} editList={editList}/>
        })}
        <button className='h-16 border border-white-800 bg-white rounded-md w-40 block font-bold hover:bg-slate-200' onClick={addList}>Add List</button>
    </DndContext>
  )
}

export default App
