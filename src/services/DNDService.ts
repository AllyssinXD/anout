import ListEntity from '../entities/ListEntity';
import ProjectEntity from '../entities/ProjectEntity';
import ListService from './ListService';
import ProjectService from './ProjectService';
import { TodoService } from './TodoService';

export class DNDService {
    static handleDragEnd(lists: ListEntity[], active: any, over: any, setLists: (lists: any[]) => void, editList: (id:string, newList: any) => void) {
        
        //handling only in front-end
        if (!active || !over) return;

        console.log(over)

        if ((over.id.toString() as string).includes("todo") && (active.id.toString() as string).includes("todo")){
            //Dropou um TODO em cima de TODO
            const activeId = (active.id.toString() as string).replace("todo", "");
            const overId = (over.id.toString() as string).replace("todo", "");

            const todoDragging = TodoService.getTodoById(lists, activeId);
            const todoDrop = TodoService.getTodoById(lists, overId);

            if(!todoDrop) return
            if(!todoDragging) return

            const list = TodoService.getListFromTodo(lists, todoDrop);
            const fromList = TodoService.getListFromTodo(lists, todoDragging);

            if(!list) return

            //Verificar se Os Todos estão em Listas distintas
            if(fromList && fromList.id != list.id){
                //Listas Distintas
                fromList.removeTodo(todoDragging.id);
                let toIndex = list.getTodos().findIndex(todo=>todo.id==overId);
                list.getTodos().splice(toIndex,0,todoDragging)

                new ListService("http://127.0.0.1:5000/api").updateList(list.id, list)
                new ListService("http://127.0.0.1:5000/api").updateList(fromList.id, fromList)

            }else{
                //Mesma lista
                let fromIndex = list.getTodos().findIndex(todo=>todo.id==activeId);
                let toIndex = list.getTodos().findIndex(todo=>todo.id==overId);

                let [item] = list.getTodos().splice(fromIndex, 1);

                console.log(list.getTodos().splice(toIndex,0,item))
                new ListService("http://127.0.0.1:5000/api").updateList(list.id, list)
            }
            
            
        }

        //Dropou LISTA encima de LISTA
        else if(over.id.toString().includes("list") && active.id.toString().includes("list")){
            const activeId = (active.id.toString() as string).replace("list", "");
            const overId = (over.id.toString() as string).replace("list", "");
        
            let newLists : ListEntity[] = [];
            let overPosition = TodoService.getListById(lists, overId)!.position | 0;
            lists.forEach(list=>{
                if(list.id == overId) {
                    list.position = overPosition+1;
                }
                else if(list.id == activeId){
                    list.position = overPosition;
                }
                else {
                    if(list.position > overPosition){
                        list.position = list.position+1;
                    }
                }
                newLists.push(list);
            })
            
            console.log(newLists)
        }

        //Dropou TODO encima de LISTA
        else if((active.id.toString() as string).includes("todo") && (over.id.toString() as string).includes("list")){

            const activeId = (active.id.toString() as string).replace("todo", "");
            const overId = (over.id.toString() as string).replace("list", "");

            const todo = TodoService.getTodoById(lists, activeId);
            const fromList = TodoService.getListFromTodo(lists, todo!)
            const toList = TodoService.getListById(lists, overId);

            if (!todo || !fromList || !toList) return;

            fromList.removeTodo(todo.id);
            toList.addTodo(todo);

            editList(fromList.id, fromList)
            editList(toList.id, toList)

            setLists([...lists]);

            new ListService("http://127.0.0.1:5000/").updateList(fromList.id, fromList);
            new ListService("http://127.0.0.1:5000/").updateList(toList.id, toList);
        }
    }
}