import React from 'react';
import {text, withKnobs} from "@storybook/addon-knobs";
import { KanbanBoard} from "./board";
import {IKanbanColumn} from "../column/column";


export default {
  title: 'Board',
  decorators: [withKnobs],
};


// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
const columns: IKanbanColumn[] = [
  { id: "col-1",
    cards: [
      { id: "card-1", title: "test" },
      { id: "card-2", title: "test" }
    ]
  },
  { id: "2",
    cards: [
      { id: "card-2-1", title: "test" },
      { id: "card-2-2", title: "test" }
    ]
  }
];



export const boardContainer = () => (
  <div style={{
    width: text("width", "1100px", "container"),
    height: text("height", "600px", "container"),
    padding: text("padding", "30px", "container")
  }}>
    <KanbanBoard columns={columns}/>
  </div>
);
boardContainer.story = {
  name: "board",
  component: KanbanBoard
};
