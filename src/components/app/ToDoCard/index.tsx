import { ToDoEntity } from "../../../entities/ToDoEntity";
import useToDoCard from "../../../hooks/useToDoCard";

export default function ToDoCard(props: {
  todo: ToDoEntity;
  openModal: (todo: ToDoEntity) => void;
}) {
  const {
    listeners,
    attributes,
    setNodeRef,
    handleClick,
    setIsHovered,
    style,
    textStyle,
  } = useToDoCard(props);

  return (
    <>
      <div
        ref={setNodeRef}
        className={`todocard relative w-full z-40 group bg-night min-h-10 mt-2 rounded-md m-auto`}
        style={style}
        {...attributes}
        {...listeners}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div
          className="z-10 w-1 h-full absolute top-0 left-0 rounded-md"
          style={{ backgroundColor: props.todo.color }}
        ></div>
        <h3
          className="z-10 p-2 text-sm flex cursor-pointer"
          style={textStyle}
        >
          {props.todo.title}
        </h3>
      </div>
    </>
  );
}
