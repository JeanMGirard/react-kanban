import { IKanbanColumn, IKanbanCard } from "./type";
export declare const reorderColumnsByLast: (list: IKanbanColumn[]) => IKanbanColumn[];
export declare const reorderColumns: (list: IKanbanColumn[], startIndex: number, endIndex: number) => IKanbanColumn[];
export declare const reorderCards: (list: IKanbanCard[], startIndex: number, endIndex: number) => IKanbanCard[];
export declare const insertCard: (list: IKanbanCard[], newCard: IKanbanCard, index: number) => IKanbanCard[];
export declare const removeCard: (list: IKanbanCard[], index: number) => IKanbanCard[];
