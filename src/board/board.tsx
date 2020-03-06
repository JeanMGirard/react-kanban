import React, {useContext, useState} from "react";
import {DragDropContext, Droppable, DropResult, DraggableLocation} from 'react-beautiful-dnd';

import {KbColumn } from "../column/column";
import {KbColumnDraggable} from "../column/column-draggable";
import {getGlobalProps, IKanbanGlobalProps} from "../globals";
import {insertCard, removeCard, reorderCards, reorderColumns} from "../sort";
import {BoardContext, BoardContextProvider} from "../context";
import {IKanbanColumn} from "..";


import "./board.scss";


export interface IKanbanBoardProps {
  columns: IKanbanColumn[];
}
export class KanbanBoard extends React.Component<IKanbanBoardProps & IKanbanGlobalProps>{
  constructor(props: IKanbanBoardProps) {
    super(props);
  }
  render(){
    const [gProps, otherProps] = getGlobalProps(this.props);
    return (
      <BoardContextProvider {...gProps}>
        <KbBoard {...otherProps}/>
      </BoardContextProvider>
    )
  }
}



const grid = 8;
// a little function to help us with reordering the result

const getBoardHeaderStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "rgb(230,230,230)" : "rgb(250,250,250)"
});



function KbBoard(props: IKanbanBoardProps){
  const bc = useContext(BoardContext);

  function onDragEnd(result: DropResult) {
    // dropped nowhere
    if (!result.destination) return;
    // did not move anywhere - can bail early
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // Same destination & source
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;



    if (result.type === 'COLUMN') {
      if(!bc.onMoveCol) bc.setColumns(reorderColumns(bc.columns, source.index, destination.index));
      if(bc.onMoveCol && bc.onMoveCol(bc.columns[source.index], destination.index))
        bc.setColumns(reorderColumns(bc.columns, source.index, destination.index));
      return;
    }

    const destI = bc.columns.findIndex(col => col.id === destination.droppableId);
    const srcI  = bc.columns.findIndex(col => col.id === source.droppableId);

    // Dropped in other column without cardCanChangeColumn
    if(srcI !== destI && !bc.canChangeCardColumn)
      return;
    // Gave validator
    else if(bc.onMoveCard && !bc.onMoveCard(bc.columns[srcI].cards[source.index], bc.columns[srcI], bc.columns[destI], destination.index))
      return;

    // reordering column
    if (result.type.startsWith("CARD")) {
      let newColumns = bc.columns;

      if(bc.canChangeCardColumn && srcI !== destI){
        const insertedCard = newColumns[srcI].cards[source.index];
        newColumns[destI].cards = insertCard(newColumns[destI].cards, insertedCard, destination.index);
        newColumns[srcI].cards  = removeCard(newColumns[srcI].cards, source.index);
      }
      else {
        newColumns[srcI].cards = reorderCards(newColumns[srcI].cards, source.index, destination.index);
      }
      bc.setColumns(newColumns);
    }
  }
  const lI = bc.columns.filter(col => !col.is_last).length;
  return (
    <div className="kb-board">
      <div className="kb-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={false}
            isCombineEnabled={false}>

            {(provided, snapshot) => (
              <div ref={provided.innerRef}
                   className="kb-header"
                   placeholder="kb-header"
                   style={getBoardHeaderStyle(snapshot.isDraggingOver)}
                   {...provided.droppableProps}>
                {bc.columns
                  .map((column, index) => (
                    <KbColumnDraggable _={column} key={column.id} i={index}/>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="kb-body">
          <DragDropContext onDragEnd={onDragEnd}>
            {bc.columns
              .filter(col => !col.is_last)
              .map((column, index) => <KbColumn _={column} key={column.id} i={index}/>)
            }
            {bc.columns
              .filter(col => col.is_last)
              .map((column, index) => <KbColumn _={column} key={column.id}  i={lI + index}/>)
            }
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}
