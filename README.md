# above-the-fold-only-server-render

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

A React component for optionally skipping server side rendering of components outside above-the-fold (or outside of the viewport). This component helps render your components on the server that are above the fold and the remaining components on the client.

## Performance

`AboveTheFoldOnlyServerRender` helps increase performance both by decreasing the load on `renderToString` and sending the end user a smaller amount of markup.

The following table outlines a clear performance increase in the `example` app by skipping server rendering on the [Walmart.com](walmart/com) `Footer` component and several other below the fold zones:

|          | HTML Size      | renderToString Time |
| -------- | -------------- | ------------------- |
| before   | 452 kB         | 249 ms              |
| after    | 315 kB         | 177 ms              |
| diff     | -137 kB (-30%) | -72 ms (-29%)       |

## Installation

```
npm install above-the-fold-only-server-render
```

## Usage

By default, the `AboveTheFoldOnlyServerRender` component simply returns the child component. You can tell the component to skip server rendering either by passing a prop `skip={true}` or setting up
`aboveTheFoldOnlyServerRender` in your app context and passing the component a `contextKey` prop.

You can skip server side rendering by passing a skip prop:

```js

const SomeComponent = () => {
  return (
    <AboveTheFoldOnlyServerRender skip={true}>
      <div>This will not be server side rendered.</div>
    </AboveTheFoldOnlyServerRender>
  );
};
```

You can also skip server side rendering by setting context and passing a contextKey prop:

```js

const SomeComponent = () => {
    return (
      <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.SomeComponent">
        <div>This will not be server side rendered based on the context.</div>
      </AboveTheFoldOnlyServerRender>
    );
};

class SomeApp extends React.Component {
  getChildContext() {
    return {
      aboveTheFoldOnlyServerRender: {
        SomeComponent: true
      }
    };
  }

  render() {
    return (
      <SomeComponent />
    );
  }
}

SomeApp.childContextTypes = {
  aboveTheFoldOnlyServerRender: React.PropTypes.shape({
    AnotherComponent: React.PropTypes.bool
  })
};

```

## Development Guide

We have an ever-green guide to our development practices with this archetype.
[Click here](https://github.com/electrode-io/electrode-archetype-react-component/blob/master/DEVELOPMENT.md)
before starting development on a component library.

## Scripts

To run the demo:

```
gulp demo
```

To view the demo, navigate to `http://localhost:4000`

To view the demo with hot reload enabled, navigate to `http://localhost:4000/webpack-dev-server/`

To run tests:

```
gulp test
```

To build /lib:

```
gulp build
```

## npm link

When using npm link, you must delete react from `zeus-components-layout/node_modules/`. This is because npm link is just a symlink, not a proper `npm install`.

You must also run `gulp build`

[npm-image]: https://badge.fury.io/js/above-the-fold-only-server-render.svg
[npm-url]: https://npmjs.org/package/above-the-fold-only-server-render
[travis-image]: https://travis-ci.org/electrode-io/above-the-fold-only-server-render.svg?branch=master
[travis-url]: https://travis-ci.org/electrode-io/above-the-fold-only-server-render
[daviddm-image]: https://david-dm.org/electrode-io/above-the-fold-only-server-render.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/electrode-io/above-the-fold-only-server-render
