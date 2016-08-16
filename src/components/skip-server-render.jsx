/*@flow*/
/* global clearTimeout, setTimeout */

import React, {Component, PropTypes} from "react";

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

    this.state = { visible: !props.skip };
    this._onShow = this._onShow.bind(this);
  }

  componentDidMount(): void {
    if (!this.state.visible) {
      this.timeout = setTimeout(this._onShow, 50);
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
    const {
      children,
      placeholder,
      placeholderClassName,
      style
    } = this.props;

    if (this.state.visible) {
      return children;
    }

    return placeholder ? placeholder : (
      <div className={placeholderClassName} style={style}></div>
    );
  }
}

SkipServerRender.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.element,
  placeholderClassName: PropTypes.string,
  skip: PropTypes.bool,
  style: PropTypes.object
};

SkipServerRender.defaultProps = {
  skip: false
};

export default SkipServerRender;
