import React from "react";

import "./column.scss";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import {IBoardColumnProps} from "../type";



export const getColumnHeaderStyle = (isDragging: boolean, draggableStyle: any) => ({
  margin: `0 0 0 0`, ...draggableStyle
});

export function KbColumnDraggable(props: IBoardColumnProps){
  const {_, i } = props;

  return (
    <>
      <Draggable  draggableId={_.id} index={i}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
               className="kb-col-header"
               style={getColumnHeaderStyle(snapshot.isDragging, provided.draggableProps.style )}>
            <div className="kb-col-header-content">
              {_.header ? _.header : <div>You must put a "header" element</div> }
            </div>
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
