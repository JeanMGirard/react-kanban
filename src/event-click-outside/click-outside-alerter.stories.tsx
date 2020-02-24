import React from 'react';
import { withKnobs, text} from "@storybook/addon-knobs";


export default {
  title: 'Events',
  decorators: [withKnobs]
};


export const _clickOutsideAlerter = () => (
  <div style={{
    margin: 40,
    width: text("width", "300px", "container")
  }}>
    TO DO
  </div>
);
/*
_clickOutsideAlerter.story = {
  name: "Outside click alerter",
  component: ContainerHeader
}

*/
