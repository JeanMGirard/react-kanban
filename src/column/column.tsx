import React, {useState} from "react";

import "./column.scss";
import {DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable} from "react-beautiful-dnd";
import {IKanbanCard, KanbanCard} from "../card/card";


const grid = 8;






const reorder = (list: IKanbanCard[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const getColumnBodyStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "rgb(230,230,230)" : "rgb(250,250,250)",
  display: "flex",
  padding: grid,
  overflow: "auto"
});
export const getColumnStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
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
  provided?: DraggableProvided,
  snapshot?: DraggableStateSnapshot
}
export function KbColumn(props: IBoardColumnProps){
  const {provided, snapshot, _, i } = props;
  const [cards, setCards] = useState<IKanbanCard[]>(_.cards || []);

  function onDragEnd(result: any) {
    if (!result.destination) return;
    setCards(reorder(cards, result.source.index, result.destination.index));
  }
  return (
    <Draggable key={_.id} draggableId={_.id} index={i}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div className="kb-col" ref={provided.innerRef} {...provided.draggableProps}>

        </div>
      )}
    </Draggable>
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
