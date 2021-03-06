import React from "react";
import { IKanbanGlobalProps } from "../globals";
import { IKanbanColumn } from "..";
import "./board.scss";
export interface IKanbanBoardProps {
    columns: IKanbanColumn[];
    headerHeight?: number;
    columnWidth?: number;
}
export declare class KanbanBoard extends React.Component<IKanbanBoardProps & IKanbanGlobalProps, any> {
    constructor(props: IKanbanBoardProps);
    render(): JSX.Element;
    componentDidUpdate(prevProps: Readonly<IKanbanBoardProps & IKanbanGlobalProps>, prevState: Readonly<{}>, snapshot?: any): void;
}
