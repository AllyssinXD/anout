export default interface DraggingTodo {
    id: string,
    getX: ()=>number,
    getY: ()=>number,
    color: string,
    title: string,
    getDescription: ()=>string
}