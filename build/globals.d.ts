import { IKanbanCard, IKanbanColumn } from "./type";
export interface IKanbanGlobalProps {
    canChangeCardColumn?: boolean;
    columns: IKanbanColumn[];
    refresh?: number;
    onMoveCard?(card: IKanbanCard, oldCol?: IKanbanColumn, newCol?: IKanbanColumn, destIndex?: Number): boolean;
    onMoveCol?(col: IKanbanColumn, index: number): boolean;
}
export declare const getGlobalProps: (props: IKanbanGlobalProps) => [IKanbanGlobalProps, any];
