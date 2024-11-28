import { TodoService } from './TodoService';

export class DNDService {
    static handleDragEnd(lists: any[], active: any, over: any, setLists: (lists: any[]) => void) {
        if (!active || !over) return;

        const id = Number.parseInt(active.id.toString());
        const overId = Number.parseInt(over.id.toString());

        const todo = TodoService.getTodoById(lists, id);
        const fromList = TodoService.getListFromTodo(lists, todo!);
        const toList = TodoService.getListById(lists, overId);

        if (!todo || !fromList || !toList) return;

        TodoService.transferTodo(fromList, toList, todo);

        setLists([...lists]);
    }
}