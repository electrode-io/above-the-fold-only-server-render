/*@flow*/
/* global clearTimeout, setTimeout */

import React from "react";

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

class SkipServerRender extends React.Component {
  constructor(props): void {
    super(props);

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
      placeholderHeight,
      placeholderWidth
    } = this.props;
    const style = {
      height: placeholderHeight,
      width: placeholderWidth
    };

    if (this.state.visible) {
      return children;
    }

    return placeholder ? placeholder : (
      <div className={placeholderClassName} style={style}></div>
    );
  }
}

SkipServerRender.propTypes = {
  children: React.PropTypes.node,
  placeholder: React.PropTypes.element,
  placeholderClassName: React.PropTypes.string,
  placeholderHeight: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  placeholderWidth: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  skip: React.PropTypes.bool
};

SkipServerRender.defaultProps = {
  skip: false
};

export default SkipServerRender;
