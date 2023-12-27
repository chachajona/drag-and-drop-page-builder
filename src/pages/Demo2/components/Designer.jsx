import React from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";

const Designer = () => {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: { isDesignerDropArea: true },
  });
  return (
    <div className="flex w-full h-full">
      <DesignerSidebar />
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={clsx(
            "bg-black max-w-[950px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-center",
            droppable.isOver && "bg-slate-300"
          )}
        >
          {!droppable.isOver && (
            <p className="text-3xl text-slate-600 flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounder-md bg-indigo-400/20"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Designer;
