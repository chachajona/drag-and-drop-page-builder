import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React from "react";
import { PageElements } from "./PageElements";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = React.useState(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
      console.log("onDragStart", event);
    },
    onDragCancel: (event) => {
      setDraggedItem(null);
      console.log("onDragCancel", event);
    },
    onDragEnd: (event) => {
      setDraggedItem(null);
      console.log("onDragEnd", event);
    },
  });

  if (!draggedItem) {
    return null;
  }

  const node = <div>No drag over me</div>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const { type } = draggedItem.data?.current?.type;
    node = (
      <SidebarBtnElementDragOverlay pageElementType={PageElements[type]} />
    );
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
