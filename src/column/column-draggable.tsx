import React, {useState} from "react";

import "./column.scss";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided, DroppableStateSnapshot
} from "react-beautiful-dnd";
import {IKanbanCard, KanbanCard} from "../card/card";


const grid = 8;



const reorder = (list: IKanbanCard[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export const getColumnHeaderStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 0 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});
export interface IKanbanColumn {
  id: string;
  cards: IKanbanCard[];
}
export interface IBoardColumnProps extends React.HTMLProps<HTMLDivElement>{
  _: IKanbanColumn,
  i: number;
}
export function KbColumnDraggable(props: IBoardColumnProps){
  const {_, i } = props;

  return (
    <>
      <Draggable  draggableId={_.id} index={i}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
               className="kb-col-header"
               style={getColumnHeaderStyle(snapshot.isDragging, provided.draggableProps.style )}>
            {/*{dropProvided?.placeholder}*/}
            {/*{dropSnapshot?.draggingOverWith}*/}
          </div>
        )}
      </Draggable>
    </>
  )
/*
  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
         className="kb-col" style={getColumnStyle(snapshot.isDragging, provided.draggableProps.style )}>
      <div {...dragEscaping}>
        <DragDropContext onDragEnd={onDragEnd} >
          <Droppable droppableId={"kb-col-"+props.i.toString()} direction="vertical">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}
                   className="kb-col-body"
                   placeholder="kb-col"
                   style={getColumnBodyStyle(snapshot.isDraggingOver)}
                   {...provided.droppableProps}>
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => <KanbanCard _={card} i={index} provided={provided} snapshot={snapshot}/>}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
  */
}
