import React from 'react';
import {text, withKnobs} from "@storybook/addon-knobs";
import { KanbanBoard } from "./board";
import { IKanbanColumn } from "../type";

import "./board.stories.scss";

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
    // type: "",
    header: <div className="col-header">header</div>,
    cards: [
      { id: "card-1-1",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-2",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-3",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-4",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-5",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-6",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-7",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-8",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-9",   elem: <div className="kaban-card">card</div> },
      { id: "card-1-10",  elem: <div className="kaban-card">card</div> },
      { id: "card-1-last", locked: true, is_last: true, elem: <div className="kaban-card">Nouveau</div> }
    ]
  },
  { id: "col-2",
    type: "action",
    locked: true,
    is_last: true,
    header: <div className="col-header">LAST_LOCKED</div>,
    cards: [
      { id: "card-2-1", locked: true, elem: <div className="kaban-card">LAST_LOCKED</div> }
    ]
  },
  { id: "col-3", // type: "",
    header: <div className="col-header">Hello</div>,
    cards: [
      { id: "card-3-1", elem: <div className="kaban-card">card</div> },
      { id: "card-3-2", elem: <div className="kaban-card">card</div> },
      { id: "card-3-last", locked: true, is_last: true, elem: <div className="kaban-card">Nouveau</div> }
    ]
  },
  { id: "col-4", // type: "",
    header: <div className="col-header">Hello</div>,
    cards: [
      { id: "card-4-1", elem: <div className="kaban-card">card</div> },
      { id: "card-4-2", elem: <div className="kaban-card">card</div> }
    ]
  },
  { id: "col-5", // type: "",
    header: <div className="col-header">Hello</div>,
    cards: [
      { id: "card-5-1", elem: <div className="kaban-card">card</div> },
      { id: "card-5-2", elem: <div className="kaban-card">card</div> }
    ]
  },
  { id: "col-6", // type: "",
    header: <div className="col-header">Hello</div>,
    cards: [
      { id: "card-6-1", elem: <div className="kaban-card">card</div> },
      { id: "card-6-2", elem: <div className="kaban-card">card</div> }
    ]
  }
];



export const boardContainer = () => (
  <div style={{
    padding: text("padding", "10px", "container")
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
