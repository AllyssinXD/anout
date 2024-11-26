import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { ListInterface, ToDoInterface } from '../interfaces';

interface TodoModalProps {
  list: ListInterface;
  todo: ToDoInterface;
  atualizarTodo: (list:ListInterface, id:number, todo: ToDoInterface) => void;
  deletarTodo: (list:ListInterface, id:number) => void;
  fecharModal: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ list, todo, atualizarTodo, deletarTodo, fecharModal }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [color, setColor] = useState(todo.color)

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setColor(todo.color)
  }, [todo]);

  const saveChanges = () => {
    atualizarTodo(list, todo.id, { ...todo, title, description });
    fecharModal();
  };
  
  const removeTodo = () => {
    deletarTodo(list, todo.id);
    fecharModal();
  };

  return (
    <Modal isOpen={true} onRequestClose={fecharModal} contentLabel="Editar To-do">
      <div className='flex flex-col max-w-64 w-full h-full m-auto'>
        <h2 className='font-bold text-center text-2xl mb-4'>Editar To-do</h2>
        <label>Titulo:</label>
        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        <label className='mt-10'>Descrição:</label>
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        <div className='w-full flex justify-end mt-10'>
        <button className='ml-5 w-100 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400' onClick={saveChanges}>Salvar</button>
        <button className='ml-5 w-100 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400' onClick={removeTodo}>Deletar</button>
        <button className='ml-5 w-100 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400' onClick={fecharModal}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal;