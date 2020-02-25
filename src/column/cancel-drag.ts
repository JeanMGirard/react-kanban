import React from "react";


function doNothing(e: any){
  if(e){
    if(e.preventDefault) e.preventDefault();
    if(e.stopPropagation) e.stopPropagation();
  }
}

export const cancelledProperties = [
  "onClick", "onMouseDownCapture", "onClickCapture", "onDragStart", "onDragCapture",
  "onBlur", "onClickCapture",
  "onTouchMove", "onTouchEnd", "onTouchStart",
  "onDragOver", "onDragOverCapture", "onDragStart", "onDragCapture", "onDrag", "onDragStartCapture",
  "onMouseDown", "onMouseMoveCapture"
];
let dragEscaping: Partial<React.HTMLProps<HTMLDivElement>> = {
  draggable: false,
  style: { cursor: "default" }
};
cancelledProperties.forEach(prop => dragEscaping[prop] = doNothing);
