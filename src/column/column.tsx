import React, {useContext, useState} from "react";

import "./column.scss";
import { Droppable } from "react-beautiful-dnd";
import { KanbanCard } from "..";
import { BoardContext } from "../context";
import { IKanbanColumn } from "../type";



const getColumnBodyStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "rgba(230,230,230, 0.7)" : "rgba(250,250,250, 0.3)"
});


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
      <div className="kb-col-scroll">
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
    </div>
  )
}
