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

var MaybeLazyLoad = function (_React$Component) {
  (0, _inherits3.default)(MaybeLazyLoad, _React$Component);

  function MaybeLazyLoad(props) {
    (0, _classCallCheck3.default)(this, MaybeLazyLoad);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = { visible: !props.lazy };
    _this._onShow = _this._onShow.bind(_this);
    return _this;
  }

  MaybeLazyLoad.prototype.componentDidMount = function componentDidMount() {
    if (!this.state.visible) {
      this.timeout = setTimeout(this._onShow, 50);
    }
  };

  MaybeLazyLoad.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  };

  MaybeLazyLoad.prototype._onShow = function _onShow() {
    this.setState({ visible: true });
    this.props.onShow();
  };

  MaybeLazyLoad.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var height = _props.height;
    var width = _props.width;
    var visible = this.state.visible;

    var style = { height: height, width: width };

    return visible ? _react2.default.Children.only(children) : _react2.default.createElement("div", { style: style });
  };

  return MaybeLazyLoad;
}(_react2.default.Component);
/* global clearTimeout, setTimeout */

MaybeLazyLoad.propTypes = {
  children: _react2.default.PropTypes.node,
  height: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  lazy: _react2.default.PropTypes.bool,
  onShow: _react2.default.PropTypes.func,
  width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};

MaybeLazyLoad.defaultProps = {
  lazy: true,
  onShow: function onShow() {}
};

exports.default = MaybeLazyLoad;