import React from "react";

import "./column.scss";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import {IBoardColumnProps} from "../type";



export const getColumnHeaderStyle = (isDragging: boolean, draggableStyle: any) => ({
  margin: `0 0 0 0`, ...draggableStyle
});

export function KbColumnDraggable(props: IBoardColumnProps){
  const {_, i, columnWidth } = props;

  const noDrop = false; //_.locked && _.is_last;

  return (
    <>
      {!noDrop &&
      <Draggable draggableId={_.id} index={i} isDragDisabled={!!_.locked}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
               className="kb-col-header"
               style={{
                 width: typeof columnWidth === "undefined" ? 240 : columnWidth,
                ...getColumnHeaderStyle(snapshot.isDragging, provided.draggableProps.style)
               }}>
            <div className="kb-col-header-content">
              {_.header ? _.header : <div>You must put a "header" element</div>}
            </div>
          </div>
        )}
      </Draggable>
      }
      {noDrop &&
      <div className="kb-col-header"
           style={{
             width: typeof columnWidth === "undefined" ? 240 : columnWidth
           }}>
        <div className="kb-col-header-content">
          {_.header ? _.header : <div>You must put a "header" element</div>}
        </div>
      </div>
      }
    </>
  )
}
