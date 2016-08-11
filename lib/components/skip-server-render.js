"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var SkipServerRender = function (_React$Component) {
  (0, _inherits3.default)(SkipServerRender, _React$Component);

  function SkipServerRender(props) {
    (0, _classCallCheck3.default)(this, SkipServerRender);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = { visible: !props.skip };
    _this._onShow = _this._onShow.bind(_this);
    return _this;
  }

  SkipServerRender.prototype.componentDidMount = function componentDidMount() {
    if (!this.state.visible) {
      this.timeout = setTimeout(this._onShow, 50);
    }
  };

  SkipServerRender.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  };

  SkipServerRender.prototype._onShow = function _onShow() {
    this.setState({ visible: true });
  };

  SkipServerRender.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var placeholder = _props.placeholder;
    var placeholderClassName = _props.placeholderClassName;
    var placeholderHeight = _props.placeholderHeight;
    var placeholderWidth = _props.placeholderWidth;

    var style = {
      height: placeholderHeight,
      width: placeholderWidth
    };

    if (this.state.visible) {
      return children;
    }

    return placeholder ? placeholder : _react2.default.createElement("div", { className: placeholderClassName, style: style });
  };

  return SkipServerRender;
}(_react2.default.Component);
/* global clearTimeout, setTimeout */

SkipServerRender.propTypes = {
  children: _react2.default.PropTypes.node,
  placeholder: _react2.default.PropTypes.element,
  placeholderClassName: _react2.default.PropTypes.string,
  placeholderHeight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  placeholderWidth: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  skip: _react2.default.PropTypes.bool
};

SkipServerRender.defaultProps = {
  skip: false
};

exports.default = SkipServerRender;