import React, {useContext} from "react";

import "./card.scss";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot
} from "react-beautiful-dnd";
import {BoardContext} from "../context";

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
}

export function KanbanCard(props: IKanbanCardProps){
  const  {i, _} = props;
  const bc = useContext(BoardContext);

  return (
    <Draggable draggableId={_.id} index={i}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
             className="kb-card" style={getCardStyle(snapshot.isDragging, provided.draggableProps.style )}>
          {_.title}
        </div>
      )}
    </Draggable>

  )
}
