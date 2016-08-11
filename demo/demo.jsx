/*@flow*/
/*global document:false*/
import React from "react";
import ElectrodeDemoIndex from "@walmart/electrode-demo-index";

import * as libraryScope from "../src/index";

const components = [
  {
    title: "MaybeLazyLoad",
    examples: [
      {
        type: "playground",
        code: require("raw!./examples/maybe-lazy-load.example"),
        noRender: true
      }
    ]
  }
];

export default () => (
  <ElectrodeDemoIndex libraryScope={libraryScope} components={components} />
);
