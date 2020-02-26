import React from 'react';
import {text, withKnobs} from "@storybook/addon-knobs";
import { KanbanBoard } from "./board";
import { IKanbanColumn } from "../column/column";


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
  { id: "col-1", // type: "",
    cards: [
      { id: "card-1-1", title: "1-1" },
      { id: "card-1-2", title: "1-2" },
      { id: "card-1-3", title: "1-3" }
    ]
  },
  { id: "col-2", // type: "",
    cards: [
      { id: "card-2-1", title: "2-1" },
      { id: "card-2-2", title: "2-2" }
    ]
  },
  { id: "col-3", // type: "",
    cards: [
      { id: "card-3-1", title: "3-1" },
      { id: "card-3-2", title: "3-2" }
    ]
  },
  { id: "col-4", // type: "",
    cards: [
      { id: "card-4-1", title: "4-1" },
      { id: "card-4-2", title: "4-2" }
    ]
  },
  { id: "col-5", // type: "",
    cards: [
      { id: "card-5-1", title: "5-1" },
      { id: "card-5-2", title: "5-2" }
    ]
  },
  { id: "col-6", // type: "",
    cards: [
      { id: "card-6-1", title: "6-1" },
      { id: "card-6-2", title: "6-2" }
    ]
  }
];



export const boardContainer = () => (
  <div style={{
    width: text("width", "1100px", "container"),
    height: text("height", "600px", "container"),
    padding: text("padding", "30px", "container")
  }}>
    <KanbanBoard columns={columns}
                 // validateMoveCard={(card, col1, col2) => true}
                 canChangeCardColumn={true}
    />
  </div>
);
boardContainer.story = {
  name: "board",
  component: KanbanBoard
};
