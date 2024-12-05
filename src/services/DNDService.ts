import { TodoService } from './TodoService';

export class DNDService {
    static handleDragEnd(lists: any[], active: any, over: any, setLists: (lists: any[]) => void) {
        //handling only in front-end
        if (!active || !over) return;

        const id = active.id.toString();
        const overId = over.id.toString();

        const todo = TodoService.getTodoById(lists, id);
        const fromList = TodoService.getListFromTodo(lists, todo!);
        const toList = TodoService.getListById(lists, overId);

        if (!todo || !fromList || !toList) return;

        TodoService.transferTodo(fromList, toList, todo);

        setLists([...lists]);
    }
}