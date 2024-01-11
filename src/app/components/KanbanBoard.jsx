"use client";
import React, { useMemo } from "react";
import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import ColumnaContainer from "./ColumnaContainer";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const KanbanBoard = () => {
  const [columns, setcolumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);

  const [tasks, setTasks] = useState([]);

 const [activeTask, setActiveTask] = useState(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 300px
      },
    })
  );

  const numbers = [1, 2, 3, 4];

  const newNumbers = numbers.map((n) => {
    return n + 1;
  });

  console.log(newNumbers);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={ondragover}
        
      >
        <div className="mx-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnaContainer
                  key={column.id}
                  deleteColumn={deleteColumn}
                  column={column}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}

                />
              ))}
            </SortableContext>
          </div>

          <button
            onClick={createNewColumn}
            className="h-[60px] w[350px] flex gap-2 min-w-[350px] cursor-pointer rounded-lg border-2 p-4 "
          >
            <PlusIcon /> Añadir Columna
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnaContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                
              
              />
            )}

       
{activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} /> }
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createNewColumn() {
    const columnToAdd = {
      id: crypto.randomUUID(),
      title: `Column ${columns.length + 1}`,
    };

    setcolumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    const filtrarColumna = columns.filter((col) => col.id !== id);
    setcolumns(filtrarColumna);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }






  }

  function onDragEnd(event) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setcolumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setcolumns(newColumns);
  }

  function createTask(columnId) {
    const newTask = {
      id: crypto.randomUUID(),
      columnId,
      content: `Tarea : ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  // eliminar tasks

  function deleteTask(id){

    const newTasks=tasks.filter((task)=> task.id !== id);
    setTasks(newTasks)


  }


  function updateTask(id,content){


    
    const newTasks=tasks.map(task=>{
      if(task.id !== id) return task;

      return {...task,content}


     })


     setTasks(newTasks)
  }

  function ondragover(event) {
    const { active, over } = event;
  
    if (!over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    if (activeId === overId) return;
  
    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
  
    if (!isActiveTask || !isOverTask) return;
  
    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);
  
    if (!activeTask || !overTask) return;
  
    if (activeTask.columnId !== overTask.columnId) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === activeTask.id) {
          return { ...task, columnId: overTask.columnId };
        }
        return task;
      });
  
      setTasks(updatedTasks);
    }

    
  }





};

export default KanbanBoard;
