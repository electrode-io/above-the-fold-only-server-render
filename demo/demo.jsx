/*@flow*/
/*global document:false*/
import React from "react";
import ElectrodeDemoIndex from "electrode-demo-index";

import * as libraryScope from "../src/index";

const components = [
  {
    title: "SkipServerRender",
    examples: [
      {
        type: "playground",
        code: require("raw!./examples/skip-server-render.example"),
        noRender: true
      }
    ]
  }
];

export default () => (
  <ElectrodeDemoIndex libraryScope={libraryScope} components={components} />
);
