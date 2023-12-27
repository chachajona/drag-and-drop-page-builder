import { useSortable } from "@dnd-kit/sortable";
import { ReactComponent as MoveIcon } from "../../../assets/icons/moveIcon.svg";
import { CSS } from "@dnd-kit/utilities";

function Item({ id, isActive, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  return (
    <span
      data-value={id}
      className={"item" + (isActive ? " active" : "")}
      // Sortable attributes:
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <div className="flex items-center gap-2" {...listeners}>
        <button className="drag-handle">
          <MoveIcon />
        </button>
        <span>{label}</span>
      </div>
    </span>
  );
}

export default Item;
