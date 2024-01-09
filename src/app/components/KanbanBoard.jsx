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

const KanbanBoard = () => {
  const [columns, setcolumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 300px
      },
    })
  );


  



  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="mx-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnaContainer deleteColumn={deleteColumn} column={column} />
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
              />
            )}
          </DragOverlay>,document.body
          
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
  }

  function onDragEnd(event) {
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
};

export default KanbanBoard;
