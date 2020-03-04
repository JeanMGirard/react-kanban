import React, {useContext} from "react";

import "./card.scss";
import { Draggable } from "react-beautiful-dnd";
import {BoardContext} from "../context";
import {IKanbanCardProps} from "../type";

const grid = 8;
export const getCardStyle = (isDragging: boolean, draggableStyle: any) => ({
  ...draggableStyle
});

export function KanbanCard(props: IKanbanCardProps){
  const  {i, _} = props;
  const bc = useContext(BoardContext);
  const inDrop = props.has_ctxt !== false;

  return (
    <>
      {inDrop &&
      <Draggable draggableId={_.id} index={i} isDragDisabled={!!_.locked}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
               className="kb-card" style={getCardStyle(snapshot.isDragging, provided.draggableProps.style)}>
            {_.elem ? _.elem : <div>You must put a "header" element</div>}
          </div>
        )}
      </Draggable>
      }
      {!inDrop &&
      <div className="kb-card">
        {_.elem ? _.elem : <div>You must put a "header" element</div>}
      </div>
      }
    </>
  )
}
