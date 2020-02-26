import {IKanbanColumn, IKanbanCard} from "./type";

export const reorderColumns = (list: IKanbanColumn[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export const reorderCards = (list: IKanbanCard[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export const insertCard = (list: IKanbanCard[], newCard: IKanbanCard, index: number) => {
  const result = Array.from(list);
  result.splice(index, 0, newCard);
  return result;
};
export const removeCard = (list: IKanbanCard[], index: number) => {
  const result = Array.from(list);
  result.splice(index, 1);
  return result;
};
