import { useState } from 'react'

import ToDoList from './ToDoList/index'

import { ListInterface, ToDoInterface } from './interfaces' 
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

function App() {
  const sensors = useSensors(
      useSensor(PointerSensor, {
          activationConstraint: {
              delay: 120, // 250ms de espera antes de ativar o arrasto
              tolerance: 5, // Tolerância de 5px antes de cancelar o arrasto
          },
      })
  );

  const [lists, setLists] = useState<ListInterface[]>([])

  const addList = ()=>{
    setLists([...lists, {id: Date.now(), title: "New List", todos: []}])
  }

  const editList = (id: number, newList: ListInterface)=>{
    const newLists = lists.map((list) => {
      if(list.id === id){
        return newList
      }
      return list
    })
    setLists(newLists)
  }

  const removeList = (id: number)=>{
    const newLists = lists.filter((list) => {
      return list.id !== id
    })
    setLists(newLists)
  }

  const addTodo = (list: ListInterface)=>{
    const randomRGBColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    list.todos.push({id: Date.now(), title: "New Todo", description: "New Description", color: randomRGBColor})
    editList(list.id, list)
  }

  const updateTodo = (list: ListInterface, id: number, newTodo: ToDoInterface)=>{
      const newTodos = list.todos.map((todo) => {
          if(todo.id === id){
              return newTodo
          }
          return todo
      })
      list.todos = newTodos
      editList(list.id, list)
  }

  const removeTodo = (list: ListInterface, id: number)=>{
      const newTodos = list.todos.filter((todo: ToDoInterface) => {
          return todo.id !== id
      })
      list.todos = newTodos
      editList(list.id, list)
  }

  const transferTodo = (fromList: ListInterface, toList: ListInterface, todo: ToDoInterface)=>{
    const newFromTodos = fromList.todos.filter((t) => {
      return t.id !== todo.id
    })
    fromList.todos = newFromTodos

    toList.todos.push(todo)

    editList(fromList.id, fromList)
    editList(toList.id, toList)
  }

  function getTodoById(id: number): ToDoInterface | undefined{
    for(const list of lists){
      const todo = list.todos.find(t => t.id == id)
      if(todo){
        return todo
      }
    };
    return
  }
  
  function getListFromTodo(todo: ToDoInterface) : ListInterface | undefined{
    for(const list of lists){
      const todoInList = list.todos.find(t => t.id == todo.id)
      if(todoInList){
        return list
      }
    };
    return
  }

  function getListById(id: number): ListInterface | undefined{
    for(const list of lists){
      if(list.id === id){
        return list
      }
    };
    return
  }

  function handleDragEnd({active, over} : DragEndEvent){
    if(!active || !over) return

    const id = Number.parseInt(active.id.toString());
    const overId = Number.parseInt(over.id.toString())

    const todo = getTodoById(id)
    const fromList = getListFromTodo(todo!)
    const toList = getListById(overId)

    if(!todo || !fromList || !toList) return

    transferTodo(fromList, toList, todo)
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {lists.map((list) => {
          return <ToDoList key={list.id} list={list} functions={{
            addList: addList,
            editList: editList,
            removeList: removeList,
            addTodo: addTodo,
            updateTodo: updateTodo,
            removeTodo: removeTodo
          }}/>
        })}
        <button className='h-16 border border-white-800 bg-white rounded-md w-40 block font-bold hover:bg-slate-200' onClick={addList}>Add List</button>
    </DndContext>
  )
}

export default App
