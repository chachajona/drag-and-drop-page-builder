import React from "react";
import PreviewBtn from "./PreviewBtn";
import SaveBtn from "./SaveBtn";
import PublishBtn from "./PublishBtn";

const PageBuilder = () => {
  return (
    <main className="flex flex-col w-full">
      <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Page:</span>
        </h2>
        <div className="flex items-center gap-2">
          <PreviewBtn />
          <SaveBtn />
          <PublishBtn />
        </div>
      </nav>
      <div></div>
    </main>
  );
};

export default PageBuilder;
