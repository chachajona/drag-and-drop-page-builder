import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React from "react";
import { PageElements } from "./PageElements";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";
import { useDesigner } from "./context/DesignerContext";

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
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

  let node = <div>No drag over me</div>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const { type } = draggedItem.data?.current?.type;
    node = (
      <SidebarBtnElementDragOverlay pageElementType={PageElements[type]} />
    );
  }
  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>No drag over me</div>;
    else {
      const DesignerElementComponent =
        PageElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
