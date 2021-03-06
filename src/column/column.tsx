import React, {useContext, useState} from "react";

import { Droppable } from "react-beautiful-dnd";
import { KanbanCard } from "..";
import { BoardContext } from "../context";
import { IKanbanColumn, IBoardColumnProps } from "../type";

import "./column.scss";

const getColumnBodyStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "rgba(230,230,230, 0.7)" : "rgba(250,250,250, 0.3)"
});



export function KbColumn(props: IBoardColumnProps){
  const { _, columnWidth } = props;
  const bc = useContext(BoardContext);

  const [type] = useState("CARD" +
    (bc.canChangeCardColumn ? (_.type ? "-"+_.type : "") : "-"+_.id)
  );

  return (
    <div className="kb-col-body"
         style={{
           width: typeof columnWidth === "undefined" ? 240 : columnWidth
         }}>
      <div className="kb-col-scroll">
        <Droppable droppableId={_.id} type={type} direction="vertical">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}
                 className="kb-col-drop"
                 style={getColumnBodyStyle(snapshot.isDraggingOver)}
                 {...provided.droppableProps}>
              {_.cards
                .filter(card => !(card.is_last && card.locked))
                .map((card, index) => (
                <KanbanCard _={card} i={index} key={card.id}/>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="kb-col-drop" style={{ paddingTop: 0, marginTop: -6 }}>
          {_.cards
            .filter(card => (card.is_last && card.locked))
            .map((card, index) => (
              <KanbanCard _={card} i={index} key={card.id} has_ctxt={false}/>
            ))}
        </div>

      </div>
    </div>
  )
}
