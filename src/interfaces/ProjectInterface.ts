import { ToDoListEntity } from "../entities/ToDoListEntity";

export default interface ProjectInterface{
    id: string,
    name: string,
    owner_id: string,
    sharedWith: {user_id: string, role: string}[],
    lists: ToDoListEntity[]
}