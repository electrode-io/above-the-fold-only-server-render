/*@flow*/
/*global document:false*/
import React from "react";
import Demo from "electrode-demo-index";

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

const demo = () => (
  <Demo libraryScope={libraryScope} components={components} />
);

export default demo;
