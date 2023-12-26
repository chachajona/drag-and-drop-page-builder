import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem, { Item } from "./SortableItem";

export const Container = React.forwardRef((props, ref) => {
  const { children, row } = props;

  return (
    <div
      ref={ref}
      className={`container ${row ? "container-row" : "container-column"}`}
    >
      {children}
    </div>
  );
});

export default function SortableContainer(props) {
  const { getItems, id, row } = props;

  const items = getItems(id);
  const itemIds = items.map((item) => item.id);

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableItem id={id} handlePosition="top">
      <Container ref={setNodeRef} row={row}>
        <SortableContext
          items={itemIds}
          strategy={
            row ? horizontalListSortingStrategy : verticalListSortingStrategy
          }
        >
          {items.map((item) => {
            let child = <Item id={item.id} />;

            if (item.container) {
              return (
                <SortableContainer
                  key={item.id}
                  id={item.id}
                  getItems={getItems}
                  row={item.row}
                  handlePosition="top"
                />
              );
            }

            return (
              <SortableItem key={item.id} id={item.id}>
                {child}
              </SortableItem>
            );
          })}
        </SortableContext>
      </Container>
    </SortableItem>
  );
}
