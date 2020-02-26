import React from "react";
import {IKanbanGlobalProps} from "./globals";

export const BoardContext = React.createContext<IKanbanGlobalProps>({});
export class BoardContextProvider extends React.Component<IKanbanGlobalProps, IKanbanGlobalProps>{
  constructor(props: IKanbanGlobalProps) {
    super(props);
  }
  render(){
    const { children, ...gProps} = this.props;
    return (
      <BoardContext.Provider value={gProps}>
        {children}
      </BoardContext.Provider>
    )
  }
}
