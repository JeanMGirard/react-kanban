import {IKanbanCard} from "./card/card";
import {IKanbanColumn} from "./column/column";


export interface IKanbanGlobalProps {
  canChangeCardColumn?: boolean;
  validateMoveCard?(card: IKanbanCard, oldCol?: IKanbanColumn, newCol?: IKanbanColumn): boolean;
}

export const getGlobalProps = (props: IKanbanGlobalProps) => {
  const { canChangeCardColumn, validateMoveCard, ...otherProps } = props;
  return [{ canChangeCardColumn, validateMoveCard }, otherProps];
};
