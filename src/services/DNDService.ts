import ListService from './ListService';
import { TodoService } from './TodoService';

export class DNDService {
    static handleDragEnd(lists: any[], active: any, over: any, setLists: (lists: any[]) => void, editList: (id:string, newList: any) => void) {
        
        //handling only in front-end
        if (!active || !over) return;

        console.log((over.id.toString() as string).includes("todo"))

        if ((over.id.toString() as string).includes("todo")){
            const id = (active.id.toString() as string).replace("todo", "");
            const overId = (over.id.toString() as string).replace("todo", "");

            const todoDragging = TodoService.getTodoById(lists, id);
            const todoDrop = TodoService.getTodoById(lists, overId);

            if(!todoDrop) return
            if(!todoDragging) return

            const list = TodoService.getListFromTodo(lists, todoDrop);

            if(!list) return

            let fromIndex = list.getTodos().findIndex(todo=>todo.id==id);
            let toIndex = list.getTodos().findIndex(todo=>todo.id==overId);

            let [item] = list.getTodos().splice(fromIndex, 1);

            console.log(list.getTodos().splice(toIndex,0,item))
            
            new ListService("http://127.0.0.1:5000/api").updateList(list.id, list)
        }

        else{

            const id = (active.id.toString() as string).replace("todo", "");
            const overId = (over.id.toString() as string);

            const todo = TodoService.getTodoById(lists, id);
            const fromList = TodoService.getListFromTodo(lists, todo!);
            const toList = TodoService.getListById(lists, overId);

            if (!todo || !fromList || !toList) return;

            TodoService.transferTodo(fromList, toList, todo)

            editList(fromList.id, fromList)
            editList(toList.id, toList)

            setLists([...lists]);

        }
    }
}