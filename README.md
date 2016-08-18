# skip-server-render

A React component wrapper for optionally skipping SSR.

> Before getting started, please make sure you read the [React Developer Guide](https://gecgithub01.walmart.com/react/react-dev-guide)!

## Installation

```
npm install @walmart/skip-server-render
```

## Usage

By default, the `SkipServerRender` component does nothing and simply returns the child component.
You can tell the component to skip server rendering either by passing a prop `skip={true}` or 
setting up `skipServerRender` in your app context and passing the component a `contextKey` prop. 

You can skip server side rendering by passing a skip prop:

```js

const SomeComponent = () => {
  return (
    <SkipServerRender skip={true}>
      <div>This will not be server side rendered.</div>
    </SkipServerRender>
  );
};
```

You can also skip server side rendering by setting context and passing a contextKey prop:

```js

const SomeComponent = () => {
    return (
      <SkipServerRender contextKey="skipServerRender.SomeComponent">
        <div>This will not be server side rendered based on the context.</div>
      </SkipServerRender>
    );
};

class SomeApp extends React.Component {
  getChildContext() {
    return {
      skipServerRender: {
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
  skipServerRender: React.PropTypes.shape({
    AnotherComponent: React.PropTypes.bool
  })
};

```

## Performance

`SkipServerRender` helps performance both by decreasing the load on `renderToString` and sending the end user a smaller amount of markup.
The following table outlines a clear performance increase in the `R-Discovery/home` app by skipping server rendering on 
the `Footer` component and several other below the fold zones.

|          | HTML Size      | renderToString Time |
| -------- | -------------- | ------------------- |
| before   | 452 kB         | 249 ms              |
| after    | 315 kB         | 177 ms              |
| diff     | -137 kB (-30%) | -72 ms (-29%)       |


## Development Guide

We have an ever-green guide to our development practices with this archetype. 
[Click here](https://gecgithub01.walmart.com/electrode/electrode-archetype-react-component/blob/master/DEVELOPMENT.md) 
before starting development on a component library. 

## Scripts

If you want to use `builder` as a CLI tool (recommended), follow the instructions at [formidablelabs/builder to modify your `PATH`](https://github.com/formidablelabs/builder#local-install)

To run the demo:

```
builder run demo
```

To view the demo, navigate to `http://localhost:4000`

To view the demo with hot reload enabled, navigate to `http://localhost:4000/webpack-dev-server/`

To run tests:

```
builder run test
```

To build /lib:

```
builder run build
```

##npm link

When using npm link, you must delete react from `zeus-components-layout/node_modules/`. This is because npm link is just a symlink, not a proper `npm install`.

You must also run `builder run build`

## Issues

Before submitting an issue, please see the [Issue Submission Guidelines](https://gecgithub01.walmart.com/react/react-dev-guide#submitting-issues)

## Contributing

If you're interested in contributing, see the [React Developer Guide's Contribution Guide](https://gecgithub01.walmart.com/react/react-dev-guide#contributing)
