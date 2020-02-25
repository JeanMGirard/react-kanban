import React from "react";

import "./card.scss";
import {getColumnStyle, IKanbanColumn} from "../column/column";
import {DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";

const grid = 8;
export const getCardStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});
export interface IKanbanCard {
  id: string;
  title: string;
}
export interface IKanbanCardProps{
  _: IKanbanCard,
  i: number;
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot
}

export function KanbanCard(props: IKanbanCardProps){
  const { provided, snapshot, i, _ } = props;

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
         className="kb-card" style={getCardStyle(snapshot.isDragging, provided.draggableProps.style )}>


    </div>
  )
}
