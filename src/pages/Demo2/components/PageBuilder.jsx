import React from "react";
import PreviewBtn from "./button/PreviewBtn";
import SaveBtn from "./button/SaveBtn";
import PublishBtn from "./button/PublishBtn";
import Designer from "./Designer";
import { DndContext, useSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";

const PageBuilder = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationTest: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationTest: {
      activationTarget: "closest",
      delay: 300,
      tolerance: 5,
    },
  });

  const { sensors } = useSensor(mouseSensor, touchSensor);
  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-slate-400 mr-2">Page:</span>
          </h2>
          <div className="flex items-center gap-2">
            <PreviewBtn />
            <SaveBtn />
            <PublishBtn />
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-cover">
          <Designer />
        </div>
      </main>
    </DndContext>
  );
};

export default PageBuilder;
