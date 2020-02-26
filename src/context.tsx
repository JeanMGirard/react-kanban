import React from "react";
import {IKanbanGlobalProps} from "./globals";
import {IKanbanCard, IKanbanColumn} from "./type";

export type IBoardContext = {
  setColumns: (columns: IKanbanColumn[])=>void
  columns: IKanbanColumn[];
  canChangeCardColumn?: boolean;
  validateMoveCard?(card: IKanbanCard, oldCol?: IKanbanColumn, newCol?: IKanbanColumn): boolean;
}

export const BoardContext = React.createContext<IBoardContext>({
  columns: [],
  setColumns: (columns: IKanbanColumn[]) => null
});
export class BoardContextProvider extends React.Component<IKanbanGlobalProps, IBoardContext>{
  constructor(props: IKanbanGlobalProps) {
    super(props);
    this.setColumns = this.setColumns.bind(this);
    this.state = {
      columns: props.columns,
      setColumns: this.setColumns,
      canChangeCardColumn: !!props.canChangeCardColumn,
      validateMoveCard: props.validateMoveCard
    }
  }
  componentDidUpdate(prevProps: Readonly<IKanbanGlobalProps>, prevState: Readonly<IBoardContext>, snapshot?: any): void {
    if(!prevProps) return;
    let changed: boolean;

    switch (true) {
      case (prevProps.canChangeCardColumn !== this.props.canChangeCardColumn):
      case (prevProps.validateMoveCard !== this.props.validateMoveCard):
        changed = true;
        break;
      default:
        changed = false;
        break;
    }

    if(changed) {
      this.setState({
        canChangeCardColumn: !!this.props.canChangeCardColumn,
        validateMoveCard: this.props.validateMoveCard
      })
    }
  }

  render(){
    return (
      <BoardContext.Provider value={this.state}>
        { this.props.children }
      </BoardContext.Provider>
    )
  }
  setColumns(columns: IKanbanColumn[]) {
    this.setState({columns})
  }
}
