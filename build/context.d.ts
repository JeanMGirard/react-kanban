import React from "react";
import { IKanbanGlobalProps } from "./globals";
import { IKanbanCard, IKanbanColumn } from "./type";
export declare type IBoardContext = {
    setColumns: (columns: IKanbanColumn[]) => void;
    columns: IKanbanColumn[];
    canChangeCardColumn?: boolean;
    onMoveCard?(card: IKanbanCard, oldCol?: IKanbanColumn, newCol?: IKanbanColumn): boolean;
    onMoveCol?(col: IKanbanColumn, index: number): boolean;
};
export declare const BoardContext: React.Context<IBoardContext>;
export declare class BoardContextProvider extends React.Component<IKanbanGlobalProps, IBoardContext> {
    constructor(props: IKanbanGlobalProps);
    componentDidUpdate(prevProps: Readonly<IKanbanGlobalProps>, prevState: Readonly<IBoardContext>, snapshot?: any): void;
    render(): JSX.Element;
    setColumns(columns: IKanbanColumn[]): void;
}
