"use strict";

const exec = require("electrode-gulp-helper").exec;

const tasks = {
  "demo": ["generate", "server-dev"],
  "demo-iso": ["dev-iso"],
  "generate": ["generate-metadata", "generate-documentation"],
  "generate-documentation": () => exec(`electrode-docgen --package ./package.json --src ./src --markdown components.md`),
  "generate-metadata": () => exec(`electrode-docgen --package ./package.json --src ./src --metadata components.json`),
  "prepublish": ["npm:prepublish"],
  "preversion": ["check-cov"],
  "test": ["check-cov"]
}

require("electrode-archetype-react-component")(tasks);
