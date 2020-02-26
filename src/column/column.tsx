import React, {useContext, useState} from "react";

import "./column.scss";
import {
  DragDropContext,
  Draggable, DraggableLocation,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable, DroppableProvided, DroppableProvidedProps, DroppableStateSnapshot,
  DropResult
} from "react-beautiful-dnd";
import {IKanbanCard, KanbanCard} from "../card/card";
import {IKanbanGlobalProps} from "../globals";
import {BoardContext} from "../context";


const grid = 8;
function showDraggingOver(isDraggingOver: boolean, isSameDropZone?: boolean){
  return isDraggingOver;

  //console.log(dropId, _.id)
  // else if(!bc.canChangeCardColumn && !isSameDropZone)
  //   return false;
  // provided.droppableProps["data-rbd-droppable-id"]
  // draggingOverWith
  // snapshot.draggingFromThisWith
  //  if(!bc.canChangeCardColumn && dropId !== _.id){
  //   return false;
  // }
  // bc.canChangeCardColumn
}




const getColumnBodyStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "rgb(230,230,230)" : "rgb(250,250,250)"
});

export interface IKanbanColumn {
  id: string;
  type?: string,
  cards: IKanbanCard[];
}
export interface IBoardColumnProps extends React.HTMLProps<HTMLDivElement>{
  _: IKanbanColumn,
  i: number;
}
export function KbColumn(props: IBoardColumnProps){
  const { _ } = props;
  const bc = useContext(BoardContext);

  const [type] = useState("CARD" +
    (bc.canChangeCardColumn ? (_.type ? "-"+_.type : "") : "-"+_.id)
  );

  return (
    <div className="kb-col-body">
      <Droppable droppableId={_.id} type={type} direction="vertical">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}
               className="kb-col-drop"
               style={getColumnBodyStyle(snapshot.isDraggingOver)}
               {...provided.droppableProps}>
            {_.cards.map((card, index) => (
              <KanbanCard _={card} i={index} key={card.id}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
