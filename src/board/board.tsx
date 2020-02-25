import React, {useState} from "react";

import "./board.scss";
import {KbColumn, IKanbanColumn, getColumnStyle} from "../column/column";
import {DragDropContext, Droppable, Draggable, DropResult, DraggableLocation} from 'react-beautiful-dnd';




export interface IKanbanBoardProps {
  columns?: IKanbanColumn[];
}


const grid = 8;
// a little function to help us with reordering the result
const reorder = (list: IKanbanColumn[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const getBoardStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "rgb(230,230,230)" : "rgb(250,250,250)",
  display: "flex",
  padding: grid,
  overflow: "auto"
});



export function KanbanBoard(props: IKanbanBoardProps){
  const [columns, setColumns] = useState<IKanbanColumn[]>(props.columns || []);


  function onDragEnd(result: DropResult) {
    // dropped nowhere
    if (!result.destination) return;
    // did not move anywhere - can bail early
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;
    if (source.droppableId === destination.droppableId &&
        source.index === destination.index) {
      return;
    }
    // reordering column
    if (result.type === 'COLUMN') {
      setColumns(reorder(columns, result.source.index, result.destination.index));
    }
  }

  return (
    <div className="kb-board">
      <div className="kb-header">

      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={true}
          isCombineEnabled={false}>

          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="kb-body" placeholder="kb-board"
                 style={getBoardStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
              {columns.map((column, index) => <KbColumn _={column} i={index}/>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
