import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { useDroppable } from "@dnd-kit/core";

const DesignerSidebar = () => {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: { isDesignerDropArea: true },
  });

  return (
    <div className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-slate-300 p-4 bg-black overflow-auto-y h-full">
      DesignerSidebar
      <SidebarBtnElement pageElementType="TextField" />
    </div>
  );
};

export default DesignerSidebar;
