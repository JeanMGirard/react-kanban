import React, {useContext, useState} from "react";

import "./board.scss";
import {KbColumn, IKanbanColumn } from "../column/column";
import {DragDropContext, Droppable, Draggable, DropResult, DraggableLocation} from 'react-beautiful-dnd';
import {KanbanCard} from "..";
import {KbColumnDraggable} from "../column/column-draggable";
import {getGlobalProps, IKanbanGlobalProps} from "../globals";
import {IKanbanCard} from "../card/card";
import {insertCard, removeCard, reorderCards, reorderColumns} from "../sort";
import {BoardContext, BoardContextProvider} from "../context";




export interface IKanbanBoardProps {
  columns?: IKanbanColumn[];
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
  const { columns: propsColumns } = props;
  const bc = useContext(BoardContext);

  const [columns, setColumns] = useState<IKanbanColumn[]>(propsColumns || []);


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
      setColumns(reorderColumns(columns, source.index, destination.index));
      return;
    }

    const destI = columns.findIndex(col => col.id === destination.droppableId);
    const srcI  = columns.findIndex(col => col.id === source.droppableId);

    // Dropped in other column without cardCanChangeColumn
    if(srcI !== destI && !bc.canChangeCardColumn)
      return;
    // Gave validator
    else if(bc.validateMoveCard && !bc.validateMoveCard(columns[srcI].cards[source.index], columns[srcI], columns[destI]))
      return;

    // reordering column

    console.log(result.type);
    if (result.type.startsWith("CARD")) {
      let newColumns = columns;

      if(bc.canChangeCardColumn && srcI !== destI){
        const insertedCard = newColumns[srcI].cards[source.index];
        newColumns[destI].cards = insertCard(newColumns[destI].cards, insertedCard, destination.index);
        newColumns[srcI].cards  = removeCard(newColumns[srcI].cards, source.index);
      }
      else {
        newColumns[srcI].cards = reorderCards(newColumns[srcI].cards, source.index, destination.index);
      }
      setColumns(newColumns);
    }
  }

  return (
    <div className="kb-board">
      <div className="kb-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={true}
            isCombineEnabled={false}>

            {(provided, snapshot) => (
              <div ref={provided.innerRef}
                   className="kb-header"
                   placeholder="kb-header"
                   style={getBoardHeaderStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                {columns.map((column, index) => (
                  <KbColumnDraggable _={column} key={column.id} i={index}/>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="kb-body">
            {columns.map((column, index) => <KbColumn _={column} key={column.id} i={index}/>)}
          </div>
        </DragDropContext>

      </div>
    </div>
  )
}
