import React, {useState} from 'react';
import {select, text, withKnobs} from "@storybook/addon-knobs";
import {KanbanBoard} from "./board";

export default {
  title: 'Gallery',
  decorators: [withKnobs],
};

export const boardContainer = () => (
  <div style={{
    width: text("width", "600px", "container"),
    padding: text("padding", "100px", "container")
  }}>
    <KanbanBoard/>
  </div>
);
