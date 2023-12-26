import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;

  const style = {
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #9a9a9a",
    margin: "10px",
    background: "white",
    borderRadius: 8,
  };

  return <div style={style}>{id}</div>;
}

export default function SortableItem(props) {
  const { children, id } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    flex: 1,
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
