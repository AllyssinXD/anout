export default interface DraggingTodo {
    getX: ()=>number,
    getY: ()=>number,
    color: string,
    title: string,
    getDescription: ()=>string
}