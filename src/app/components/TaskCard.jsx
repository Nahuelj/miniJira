"use client ";
import React from "react";
import Trash from "../icons/Trash";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const TaskCard = ({ task, deleteTask, updateTask }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editmode, setEditMode] = useState(false);


  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editmode,
  });




  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };



  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };
const confirmDeleteTask = () => {
    const isConfirmed = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (isConfirmed) {
      deleteTask(task.id);
    }
  };



  if (editmode) {
    
    return (
      <>
        <div ref={setNodeRef} style={style}
        {...attributes}
        {...listeners}


         className="p-5 h-[70px] min-h-[40px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset cursor-grab  relative bg-[#005B99] ">
          <textarea
            className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
            value={task.content}
            autoFocus
            placeholder="Editando..."
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleEditMode();
            }}
            onChange={(e) => updateTask(task.id, e.target.value)}
          ></textarea>
        </div>
      </>
    );
  }


  if(isDragging){
    return <div style={style} className="p-5 h-[70px] min-h-[40px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset cursor-grab  relative bg-[#0E0E0E] opacity-5">
  
    </div>



  }
 


  return (
    <div
    
    ref={setNodeRef} style={style}
    {...attributes}
    {...listeners}

      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="p-5 h-[70px] min-h-[40px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset cursor-grab  relative bg-[#F73859]  text-white"
    >
      <h2 className="my-auto  w-full overflow-y-auto overflow-x-auto whitespace-pre-wrap ">
        {" "}
        {task.content}
      </h2>

      {mouseIsOver && (
        <button
          onClick={() => {
            confirmDeleteTask(task.id)
          }}
          className="stroke-white absolute  right-4 top-1/2 -translate-y-1/2 p-2 rounded"
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
