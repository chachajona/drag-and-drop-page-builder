import React from "react";
import { PageElements } from "./PageElements";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";

const SidebarBtnElement = ({ pageElementType }) => {
  const pageElement = PageElements[pageElementType];

  const { label, icon } = pageElement.designBtnElement;
  const draggable = useDraggable({
    id: `design-btn-${pageElement.type}`,
    data: {
      type: pageElement.type,
      isDesignBtnElement: true,
    },
  });
  return (
    <button
      ref={draggable.setNodeRef}
      className={clsx(
        "flex flex-col gap-2 h-[120px] w-[120px] bg-slate-300 p-4 rounded-lg cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div className="h-8 w-8 text-primary cursor-grab">{icon}</div>
      <p className="text-xs">{label}</p>
    </button>
  );
};

export const SidebarBtnElementDragOverlay = ({ pageElementType }) => {
  const pageElement = PageElements[pageElementType];

  const { label, icon } = pageElement.designBtnElement;
  return (
    <button className="flex flex-col gap-2 h-[120px] w-[120px] bg-slate-300 p-4 rounded-lg cursor-grab">
      <div className="h-8 w-8 text-primary cursor-grab">{icon}</div>
      <p className="text-xs">{label}</p>
    </button>
  );
};

export default SidebarBtnElement;
