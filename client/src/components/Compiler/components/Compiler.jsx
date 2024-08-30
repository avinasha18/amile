import React from "react";
import CodeHelperEditor from "./CodeHelperEditor";
import RenderCode from "./RenderCode";
import CodeEditor from "./ui/CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

 function Compiler() {
  return (
    <ResizablePanelGroup direction="horizontal" className="  ">
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[200px]"
        defaultSize={50}
      >
        <CodeHelperEditor />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[200px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Compiler;
