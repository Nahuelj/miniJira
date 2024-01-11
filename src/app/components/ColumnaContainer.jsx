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
        className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col bg-slate-700 opacity-40 border-rose-500 border-4"
      >
        {" "}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col bg-slate-700 "
    >
      <div className="flex   ">
        <div className="text-md  w-full flex h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 bg-slate-200">
          <div>
            <p>0</p>
          </div>

          <div
            {...attributes}
            {...listeners}
            onClick={() => {
              setEditMode(true);
            }}
            className="flex justify-center w-full"
          >
            {!editMode && column.title}

            {editMode && (
              <input
                className=" focus:border-rose-500 border rounded outline-none px-2"
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
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              deleteTask={deleteTask}
              task={task}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={() => createTask(column.id)}
        className="flex gap-2 items-center text-white hover:text-green-300"
      >
        <PlusIcon />
        Add Tasks
      </button>
    </div>
  );
};

export default ColumnaContainer;
