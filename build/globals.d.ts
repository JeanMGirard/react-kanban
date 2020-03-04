import { IKanbanCard, IKanbanColumn } from "./type";
export interface IKanbanGlobalProps {
    canChangeCardColumn?: boolean;
    columns: IKanbanColumn[];
    validateMoveCard?(card: IKanbanCard, oldCol?: IKanbanColumn, newCol?: IKanbanColumn): boolean;
}
export declare const getGlobalProps: (props: IKanbanGlobalProps) => [IKanbanGlobalProps, any];
