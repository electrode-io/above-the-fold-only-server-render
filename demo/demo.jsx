/*@flow*/
/*global document:false*/
import React from "react";
import ElectrodeDemoIndex from "electrode-demo-index";

import * as libraryScope from "../src/index";

const components = [
  {
    title: "AboveTheFoldOnlyServerRender",
    examples: [
      {
        type: "playground",
        code: require("raw!./examples/above-the-fold-only-server-render.example"),
        noRender: true
      }
    ]
  }
];

export default () => (
  <ElectrodeDemoIndex libraryScope={libraryScope} components={components} />
);
