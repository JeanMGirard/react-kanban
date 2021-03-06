import React, {useState} from 'react';
import {text, withKnobs} from "@storybook/addon-knobs";
import { KanbanBoard } from "./board";
import { IKanbanColumn } from "../type";

import "./board.stories.scss";
import {KbColumnDraggable} from "../column/column-draggable";

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
let testColumns: IKanbanColumn[] = [
  { id: "col-1",
    // type: "",
    header: <div className="col-header">header-1</div>,
    cards: [
      { id: "card-1-1",   elem: <div className="kaban-card">1-1</div> },
      { id: "card-1-2",   elem: <div className="kaban-card">1-2</div> },
      { id: "card-1-3",   elem: <div className="kaban-card">1-3</div> },
      { id: "card-1-4",   elem: <div className="kaban-card">1-4</div> },
      { id: "card-1-5",   elem: <div className="kaban-card">1-5</div> },
      { id: "card-1-6",   elem: <div className="kaban-card">1-6</div> },
      { id: "card-1-7",   elem: <div className="kaban-card">1-7</div> },
      { id: "card-1-8",   elem: <div className="kaban-card">1-8</div> },
      { id: "card-1-9",   elem: <div className="kaban-card">1-9</div> },
      { id: "card-1-10",  elem: <div className="kaban-card">1-10</div> },
      { id: "card-1-last", locked: true, is_last: true, elem: <div className="kaban-card">1-last</div> }
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
    header: <div className="col-header">header-3</div>,
    cards: [
      { id: "card-3-1", elem: <div className="kaban-card">3-1</div> },
      { id: "card-3-2", elem: <div className="kaban-card">3-2</div> },
      { id: "card-3-last", locked: true, is_last: true, elem: <div className="kaban-card">3-last</div> }
    ]
  },
  { id: "col-5", // type: "",
    header: <div className="col-header">header-5</div>,
    cards: [
      { id: "card-5-1", elem: <div className="kaban-card">5-1</div> },
      { id: "card-5-2", elem: <div className="kaban-card">5-2</div> }
    ]
  },
  { id: "col-6", // type: "",
    header: <div className="col-header">header-6</div>,
    cards: [
      { id: "card-6-1", elem: <div className="kaban-card">6-1</div> },
      { id: "card-6-2", elem: <div className="kaban-card">6-2</div> }
    ]
  }
];

function BoardStory(props: any){
  const [columns, setColumns] = useState(testColumns);
  const [r, reload] = useState(0);

  return (
    <>
      <button onClick={() => {
        columns.push({ id: "col-4", // type: "",
          header: <div className="col-header">header-4</div>,
          cards: [
            { id: "card-4-1", elem: <div className="kaban-card">4-1</div> },
            { id: "card-4-2", elem: <div className="kaban-card">4-2</div> }
          ]
        });
        setColumns(columns);
        reload(r+1);
      }}/>
      <KanbanBoard columns={columns}
                   headerHeight={50}
                   columnWidth={180}
                   refresh={r}
                   onMoveCol={(col, index) => {return true;}}
                   onMoveCard={(card, col1, col2, dI) => { return true;}}
                   canChangeCardColumn={true}/>
    </>
  )
}

export const boardContainer = () => (

  <div style={{
    padding: text("padding", "10px", "container")
  }}>
    <BoardStory/>
  </div>
);
boardContainer.story = {
  name: "board",
  component: KanbanBoard
};
