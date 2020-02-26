import {IKanbanCard, IKanbanColumn} from "./type";


export interface IKanbanGlobalProps {
  canChangeCardColumn?: boolean;
  columns: IKanbanColumn[];
  validateMoveCard?(card: IKanbanCard, oldCol?: IKanbanColumn, newCol?: IKanbanColumn): boolean;
}

export const getGlobalProps = (props: IKanbanGlobalProps): [IKanbanGlobalProps, any] => {
  const { canChangeCardColumn, validateMoveCard, columns, ...otherProps } = props;
  return [{ canChangeCardColumn, validateMoveCard, columns }, otherProps];
};
