import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableContainer, { Container } from "./components/Container";
import SortableItem, { Item } from "./components/SortableItem";
import { useComponentStore } from "../../store/components";

export default function Demo1() {
  const { components, addNewComponent, setComponents } = useComponentStore(
    (state) => ({
      components: state.components,
      addNewComponent: state.addNewComponent,
      setComponents: state.setComponents,
    })
  );
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function addItem(container, row) {
    return () => {
      addNewComponent({
        id: components.length + 1,
        container,
        row,
      });
    };
  }

  function isContainer(id) {
    const item = components.find((item) => item.id === id);

    return !item ? false : item.container;
  }

  function isRow(id) {
    const item = components.find((item) => item.id === id);

    return !item ? false : item.row;
  }

  function getItems(parent) {
    return components.filter((item) => {
      if (!parent) {
        return !item.parent;
      }

      return item.parent === parent;
    });
  }

  function getItemIds(parent) {
    return getItems(parent).map((item) => item.id);
  }

  function findParent(id) {
    const item = components.find((item) => item.id === id);
    return !item ? false : item.parent;
  }

  function getDragOverlay() {
    if (!activeId) {
      return null;
    }

    if (isContainer(activeId)) {
      const item = components.find((i) => i.id === activeId);

      return (
        <Container row={item.row}>
          {getItems(activeId).map((item) => (
            <Item key={item.id} id={item.id} />
          ))}
        </Container>
      );
    }

    return <Item id={activeId} />;
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    let overId;
    if (over) {
      overId = over.id;
    }

    const overParent = findParent(overId);
    const overIsContainer = isContainer(overId);
    const activeIsContainer = isContainer(activeId);
    if (overIsContainer) {
      const overIsRow = isRow(overId);
      const activeIsRow = isRow(activeId);
      // only columns to be added to rows
      if (overIsRow) {
        if (activeIsRow) {
          return;
        }

        if (!activeIsContainer) {
          return;
        }
      } else if (activeIsContainer) {
        return;
      }
    }

    const activeIndex = components.findIndex((item) => item.id === id);
    const overIndex = components.findIndex((item) => item.id === overId);

    let newIndex = overIndex;
    const isBelowLastItem = over && overIndex === components.length - 1;

    const modifier = isBelowLastItem ? 1 : 0;

    newIndex = overIndex >= 0 ? overIndex + modifier : components.length + 1;

    let nextParent;
    if (overId) {
      nextParent = overIsContainer ? overId : overParent;
    }

    components[activeIndex].parent = nextParent;
    const newComponents = arrayMove(components, activeIndex, newIndex);
    setComponents(newComponents);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    let overId;
    if (over) {
      overId = over.id;
    }

    const activeIndex = components.findIndex((item) => item.id === id);
    const overIndex = components.findIndex((item) => item.id === overId);

    let newIndex = overIndex >= 0 ? overIndex : 0;

    if (activeIndex !== overIndex) {
      setComponents(arrayMove(components, activeIndex, newIndex));
    }

    setActiveId(null);
  }

  return (
    <div className="flex flex-row gap-8 mx-80 my-5">
      <div className="flex flex-col border w-full p-10">
        <div className="btn" onClick={addItem()}>
          Add Item
        </div>
        <div className="btn" onClick={addItem(true)}>
          Add Column
        </div>
        <div className="btn" onClick={addItem(true, true)}>
          Add Row
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        strategy={closestCorners}
      >
        <SortableContext
          id="root"
          items={getItemIds()}
          strategy={verticalListSortingStrategy}
        >
          <div className="droppable">
            {getItems().map((item) => {
              if (item.container) {
                return (
                  <SortableContainer
                    key={item.id}
                    id={item.id}
                    getItems={getItems}
                    row={item.row}
                  />
                );
              }

              return (
                <SortableItem key={item.id} id={item.id}>
                  <Item id={item.id} />
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
        <DragOverlay>{getDragOverlay()}</DragOverlay>
      </DndContext>

      <div className="border w-full p-10"></div>
    </div>
  );
}
