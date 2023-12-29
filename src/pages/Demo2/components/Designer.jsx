import React from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDroppable, useDraggable } from "@dnd-kit/core";
import { clsx } from "clsx";
import useDesigner from "./hooks/useDesigner";
import { PageElements } from "./PageElements";
import { idGenerator } from "../lib/idGenerator";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: { isDesignerDropArea: true },
  });

  console.log("element", elements);

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = PageElements[type].construct(idGenerator());
        addElement(0, newElement);
        console.log("newElement", newElement);
      }
      console.log("onDragEnd", event);
    },
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
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-slate-600 flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounder-md bg-indigo-400/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col text-slate-600 w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DesignerElementWrapper = ({ element }) => {
  const { removeElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = React.useState(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerComponent: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerComponent: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = PageElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative h-[120px] flex flex-col text-black hover:cursor-pointer rounded-md rind-1 rind-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute  w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bg-accent w-ful bottom-0 h-1/2 rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 w-full">
            <button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={() => removeElement(element.id)}
            >
              <BiSolidTrash className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full ">
            <p className="text-slate-300 text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full h-[7px] rounded-md bg-white rounded-b-none" />
      )}
      <div
        className={clsx(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />;
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full h-[7px] rounded-md bg-white rounded-t-none" />
      )}
    </div>
  );
};
export default Designer;
