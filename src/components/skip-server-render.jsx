/*@flow*/
/* global clearTimeout, setTimeout */

import React, {Children, Component, PropTypes} from "react";
import get from "lodash/get";

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
    if (this.state.visible) {
      return Children.only(this.props.children);
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
  children: PropTypes.node.isRequired,
  contextKey: PropTypes.string,
  placeholder: PropTypes.element,
  placeholderClassName: PropTypes.string,
  placeholderStyle: PropTypes.object,
  skip: PropTypes.bool
};

SkipServerRender.contextTypes = {
  skipServerRender: PropTypes.object
};

SkipServerRender.defaultProps = {
  skip: false
};

export default SkipServerRender;
