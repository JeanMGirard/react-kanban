import React from "react";
import {IKanbanGlobalProps} from "./globals";
import {IKanbanCard, IKanbanColumn} from "./type";
import {reorderColumnsByLast} from "./sort";

export type IBoardContext = {
  setColumns: (columns: IKanbanColumn[])=>void
  columns: IKanbanColumn[];
  canChangeCardColumn?: boolean;
  onMoveCard?(card: IKanbanCard, oldCol?: IKanbanColumn, newCol?: IKanbanColumn, destI?: number): boolean;
  onMoveCol?(col: IKanbanColumn, index: number): boolean;
  refresh?: number;
}

export const BoardContext = React.createContext<IBoardContext>({
  columns: [],
  refresh: 0,
  setColumns: (columns: IKanbanColumn[]) => null
});
export class BoardContextProvider extends React.Component<IKanbanGlobalProps, IBoardContext>{
  constructor(props: IKanbanGlobalProps) {
    super(props);
    this.setColumns = this.setColumns.bind(this);
    this.state = {
      refresh: props.refresh || 0,
      columns: reorderColumnsByLast(props.columns),
      setColumns: this.setColumns,
      canChangeCardColumn: !!props.canChangeCardColumn,
      onMoveCard: props.onMoveCard,
      onMoveCol: props.onMoveCol
    }
  }
  componentDidUpdate(prevProps: Readonly<IKanbanGlobalProps>, prevState: Readonly<IBoardContext>, snapshot?: any): void {
    if(!prevProps) return;
    let changed: boolean;

    switch (true) {
      case (prevProps.canChangeCardColumn !== this.props.canChangeCardColumn):
      case (prevProps.onMoveCol !== this.props.onMoveCol):
      case (prevProps.onMoveCard !== this.props.onMoveCard):
        changed = true;
        break;
      default:
        changed = false;
        break;
    }

    if(changed) {
      this.setState({
        canChangeCardColumn: !!this.props.canChangeCardColumn,
        onMoveCard: this.props.onMoveCard,
        onMoveCol: this.props.onMoveCol
      })
    }
    else if(prevProps.refresh !== this.props.refresh){
      this.setState( {
        refresh: this.props.refresh,
        columns: reorderColumnsByLast(this.props.columns)
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
    this.setState({ columns })
  }
}
