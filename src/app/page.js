"use client";
import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "@/helpers/reactStrictModeDrag";

const initialTask = [
  { task: "ordenar", id: 1 },
  { task: "limpiar", id: 2 },
  { task: "comprar groceries", id: 3 },
  { task: "hacer ejercicio", id: 4 },
  { task: "estudiar", id: 5 },
  { task: "preparar cena", id: 6 },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTask);
  console.log(tasks);
  const taskIds = tasks.map((task) => task.id);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }
        setTasks((prevTasks) => {
          return reorder(prevTasks, source.index, destination.index);
        });
      }}
    >
      <div className="app">
        <h1>title</h1>
        <Droppable droppableId="task1">
          {(droppableProvider) => (
            <ul
              {...droppableProvider.droppableProps}
              ref={droppableProvider.innerRef}
            >
              {tasks &&
                tasks.map((task, index) => (
                  <Draggable
                    index={taskIds.indexOf(task.id)}
                    key={task.id}
                    draggableId={task.id.toLocaleString()}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={task.id}
                      >
                        {task.task}
                      </li>
                    )}
                  </Draggable>
                ))}
              {droppableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default App;
