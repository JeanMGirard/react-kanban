import React from "react";

export interface IKanbanColumn {
  id: string;
  type?: string,
  header?: any,
  cards: IKanbanCard[];
}
export interface IBoardColumnProps extends React.HTMLProps<HTMLDivElement>{
  _: IKanbanColumn,
  i: number;
}
export interface IKanbanCard {
  id: string;
  elem: any;
}
export interface IKanbanCardProps{
  _: IKanbanCard,
  i: number;
}
