import React from "react";
import { IKanbanColumn } from "../type";
import "./column.scss";
export interface IBoardColumnProps extends React.HTMLProps<HTMLDivElement> {
    _: IKanbanColumn;
    i: number;
}
export declare function KbColumn(props: IBoardColumnProps): JSX.Element;
