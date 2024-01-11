"use client";
import Trash from "../icons/Trash";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

const ColumnaContainer = (props) => {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[350px] h-[500px]  max-h-[500px] rounded-md flex flex-col bg-slate-700 border-rose-300 border-4"
      >
        {" "}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col bg-[#F0F5F9] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border  "
    >
      <div className="flex   ">
        <div className="text-md justify-between items-center w-full flex h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 bg-[#322f3e] text-white ">
        

          <div
            {...attributes}
            {...listeners}
            onClick={() => {
              setEditMode(true);
            }}
            className="text-sm w-full"
          >
            {!editMode && column.title}

            {editMode && (
              <input
                className=" text-black w-full border rounded outline-none px-2"
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              ></input>
            )}
          </div>

          <div>
            <button onClick={() => deleteColumn(column.id)}>
              <Trash />
            </button>
          </div>

        </div>

      </div>

      <div className="flex text-white flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasks.map((task) => task.id)}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={() => createTask(column.id)}
        className="flex p-2  items-center text-sm hover:text-[#272343]  text-[#1E2022] "
      >
        <PlusIcon />
        Añadir Tarea
      </button>
    </div>
  );
};

export default ColumnaContainer;
