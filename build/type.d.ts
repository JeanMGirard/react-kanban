import React from "react";
export interface IKanbanColumn {
    id: string;
    type?: string;
    header?: any;
    locked?: boolean;
    is_last?: boolean;
    cards: IKanbanCard[];
}
export interface IBoardColumnProps extends React.HTMLProps<HTMLDivElement> {
    _: IKanbanColumn;
    i: number;
    columnWidth?: number;
}
export interface IKanbanCard {
    id: string;
    elem: any;
    locked?: boolean;
    is_last?: boolean;
}
export interface IKanbanCardProps {
    _: IKanbanCard;
    has_ctxt?: boolean;
    i: number;
}
