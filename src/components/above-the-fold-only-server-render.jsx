/*@flow*/
/* global clearTimeout, setTimeout */

import React, {Component} from "react";
import PropTypes from "prop-types";
import get from "lodash/get";

const SHOW_TIMEOUT = 50;

/**
A component for configurable skip loading.
@examples
```jsx
<AboveTheFoldOnlyServerRender skip={true}>
  <Footer />
</AboveTheFoldOnlyServerRender>
```
@component AboveTheFoldOnlyServerRender
@import {AboveTheFoldOnlyServerRender}
@playground
AboveTheFoldOnlyServerRender
```
<AboveTheFoldOnlyServerRender skip={true}>
  <Footer />
</AboveTheFoldOnlyServerRender>
```
@returns {ReactElement} The rendered component
*/

class AboveTheFoldOnlyServerRender extends Component {
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

    return placeholder || (
      <div className={placeholderClassName} style={placeholderStyle}></div>
    );
  }
}

AboveTheFoldOnlyServerRender.propTypes = {
  /**
  Children to render when visible
  */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),

  /**
  Tell AboveTheFoldOnlyServerRender to read context in order to skip server side rendering
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
  Tell AboveTheFoldOnlyServerRender to skip server side rendering
  */
  skip: PropTypes.bool
};

AboveTheFoldOnlyServerRender.contextTypes = {
  aboveTheFoldOnlyServerRender: PropTypes.object
};

AboveTheFoldOnlyServerRender.defaultProps = {
  skip: false
};

export default AboveTheFoldOnlyServerRender;
