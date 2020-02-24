import React from "react";

import { EnvoyWrapper } from "envoy-react";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="app">
        <EnvoyWrapper text="test-wrapper">
          
        </EnvoyWrapper>
      </div>
    );
  }
}
