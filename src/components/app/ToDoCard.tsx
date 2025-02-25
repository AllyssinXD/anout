import { useEffect, useState } from "react";
import { ToDoEntity } from "../../entities/ToDoEntity";
import useToDoCard from "../../hooks/useToDoCard";
import { TodoService } from "../../services/TodoService";
import { useAppContext } from "../../context/AppProvider";

export default function ToDoCard(props: {
  todo: ToDoEntity;
  openModal: (todo: ToDoEntity) => void;
}) {
  const {
    listeners,
    attributes,
    setNodeRef,
    handleClick,
    isHover,
    setIsHovered,
    style,
    textStyle,
    setNodeRefDroppable,
  } = useToDoCard(props);

  const appContext = useAppContext();
  // Placeholder for "done" functionality
  const [done, setDone] = useState(props.todo.done);
  const [leftTimeToDue, setLeftTimeToDue] = useState(0);

  useEffect(() => {
    //calc if due is close
    const today = new Date();
    const due = props.todo.dueDate;

    if (!due) {
      return;
    }

    const diff = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setLeftTimeToDue(diffDays);
  }, [props.todo.dueDate]);

  return (
    <>
      <div
        ref={(e) => {
          setNodeRef(e);
          setNodeRefDroppable(e);
        }}
        className={`todocard relative w-full z-40 group bg-night min-h-10 mt-2 rounded-md m-auto transition-all`}
        style={style}
        {...attributes}
        {...listeners}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        key={props.todo.id}
      >
        <div
          className="z-10 w-1 h-full absolute top-0 left-0 rounded-md"
          style={{ backgroundColor: props.todo.color }}
        ></div>
        <div>
          <h3
            className={`block z-11 p-2 text-sm font-medium flex cursor-pointer ${textStyle}`}
          >
            {props.todo.title}
          </h3>
          {/* Due date 
            if due date is within 2 days of today, it will be highlighted with bg-crimson,
            if due date is within 4 days of today, it will be highlighted with a yellow background (tailwind class bg-yellow-400),
          */}
          {props.todo.dueDate ? (
            <div
              className={`flex items-center ${
                leftTimeToDue < 3 && !done
                  ? "bg-crimson"
                  : leftTimeToDue < 5 && !done
                  ? "bg-yellow-700"
                  : done
                  ? "bg-emerald"
                  : "bg-night"
              } rounded-md m-2`}
            >
              {/* for transition propurses div */}
              <div
                className={`overflow-hidden ${
                  done && !isHover
                    ? "w-0"
                    : leftTimeToDue < 4
                    ? "w-10"
                    : isHover
                    ? "w-10"
                    : "w-0"
                } transition-all`}
              >
                {!isHover && leftTimeToDue < 4 && !done ? (
                  <div
                    className={
                      "flex justify-center items-center w-5 h-5 m-2 rounded-md " +
                      (leftTimeToDue < 3
                        ? "bg-crimson"
                        : leftTimeToDue == 3
                        ? "bg-yellow-700"
                        : "")
                    }
                  >
                    {/* white exclamation mark (svg image) */}
                    <img
                      src="/images/icons/exclamation.svg"
                      className={`w-5 h-5 brightness-0 invert`}
                      alt="Exclamation"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-5 h-5 m-2 rounded-md ${
                      done ? "bg-emerald" : "bg-night border border-silver"
                    } ${isHover ? "opacity-100" : "opacity-0"} transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTodo = props.todo;
                      newTodo.done = !newTodo.done;
                      setDone(newTodo.done);

                      const list = TodoService.getListFromTodo(
                        appContext.lists,
                        newTodo
                      );

                      if (!list) return;

                      appContext.editList(list.id, list);
                    }}
                  >
                    {done ? (
                      <img
                        src="/images/icons/check.svg"
                        className="w-5 h-5"
                        alt="Check"
                      />
                    ) : null}
                  </div>
                )}
              </div>
              <div
                className={`flex flex-col items-center ${
                  done
                    ? "text-dark"
                    : leftTimeToDue < 3
                    ? "text-silver"
                    : "text-silver"
                }`}
              >
                {/* Português 
                  align left
                */}
                {!done ? (
                  <>
                    <label className="text-sm">
                      {props.todo.dueDate.toLocaleDateString()}
                    </label>
                    <label className={"text-xs w-full"}>
                      {leftTimeToDue < 0
                        ? "Atrasado"
                        : leftTimeToDue == 0
                        ? "Para hoje"
                        : leftTimeToDue == 1
                        ? "Para amanhã"
                        : `Faltam ${leftTimeToDue} dias`}
                    </label>
                  </>
                ) : (
                  <label className="text-sm p-2">Finalizado!</label>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
