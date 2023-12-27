import React from "react";
import PreviewBtn from "./button/PreviewBtn";
import SaveBtn from "./button/SaveBtn";
import PublishBtn from "./button/PublishBtn";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";

const PageBuilder = () => {
  return (
    <DndContext>
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
