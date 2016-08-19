/*@flow*/
/* global clearTimeout, setTimeout */

import React, {Component, PropTypes} from "react";
import get from "lodash/get";

const SHOW_TIMEOUT = 50;

/**
A component for configurable skip loading.
@examples
```jsx
<SkipServerRender skip={true}>
  <Footer />
</SkipServerRender>
```
@component SkipServerRender
@import {SkipServerRender}
@playground
SkipServerRender
```
<SkipServerRender skip={true}>
  <Footer />
</SkipServerRender>
```
@returns {ReactElement} The rendered component
*/

class SkipServerRender extends Component {
  constructor(props, context): void {
    super(props, context);

    if (props.skip) {
      this.state = { visible: false };
    } else {
      this.state = { visible: !get(context, props.contextKey, false) };
    }

    this._onShow = this._onShow.bind(this);
  }

  componentDidMount(): void {
    if (!this.state.visible) {
      this.timeout = setTimeout(this._onShow, SHOW_TIMEOUT);
    }
  }

  componentWillUnmount(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  _onShow(): void {
    this.setState({ visible: true });
  }

  render(): ReactElement {
    if (this.state.visible) {
      return this.props.children;
    }

    const {
      placeholder,
      placeholderClassName,
      placeholderStyle
    } = this.props;

    return placeholder ? placeholder : (
      <div className={placeholderClassName} style={placeholderStyle}></div>
    );
  }
}

SkipServerRender.propTypes = {
  /**
  Children to render when visible
  */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),

  /**
  Tell SkipServerRender to read context in order to skip server side rendering
  */
  contextKey: PropTypes.string,

  /**
  Pass in another element to render when skipping server side rendering
  */
  placeholder: PropTypes.element,

  /**
  Sets the className of the default placeholder
  */
  placeholderClassName: PropTypes.string,

  /**
  Sets the style of the default placeholder
  */
  placeholderStyle: PropTypes.object,

  /**
  Tell SkipServerRender to skip server side rendering
  */
  skip: PropTypes.bool
};

SkipServerRender.contextTypes = {
  skipServerRender: PropTypes.object
};

SkipServerRender.defaultProps = {
  skip: false
};

export default SkipServerRender;
