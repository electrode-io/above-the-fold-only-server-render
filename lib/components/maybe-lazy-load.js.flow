/*@flow*/
/* global clearTimeout, setTimeout */

import React from "react";

/**
A component for configurable lazy loading.
@examples
```jsx
<MaybeLazyLoad lazy={true}>
  <Footer />
</MaybeLazyLoad>
```
@component MaybeLazyLoad
@import {MaybeLazyLoad}
@playground
MaybeLazyLoad
```
<MaybeLazyLoad lazy={true}>
  <Footer />
</MaybeLazyLoad>
```
@returns {ReactElement} The rendered component
*/

class MaybeLazyLoad extends React.Component {
  constructor(props): void {
    super(props);

    this.state = { visible: !props.lazy };
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
    this.props.onShow();
  }

  render(): ReactElement {
    const {children, height, width} = this.props;
    const {visible} = this.state;
    const style = {height, width};

    return visible ? (
      React.Children.only(children)
    ) : (
      <div style={style}></div>
    );
  }
}

MaybeLazyLoad.propTypes = {
  children: React.PropTypes.node,
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  lazy: React.PropTypes.bool,
  onShow: React.PropTypes.func,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

MaybeLazyLoad.defaultProps = {
  lazy: true,
  onShow: () => {}
};

export default MaybeLazyLoad;
