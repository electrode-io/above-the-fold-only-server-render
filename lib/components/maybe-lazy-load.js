"use strict";

exports.__esModule = true;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLazyLoad = require("react-lazy-load");

var _reactLazyLoad2 = _interopRequireDefault(_reactLazyLoad);

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

var MaybeLazyLoad = function MaybeLazyLoad(_ref) {
  var children = _ref.children;
  var lazy = _ref.lazy;
  var props = (0, _objectWithoutProperties3.default)(_ref, ["children", "lazy"]);

  return lazy ? _react2.default.createElement(
    _reactLazyLoad2.default,
    props,
    _react2.default.Children.only(children)
  ) : _react2.default.Children.only(children);
};

MaybeLazyLoad.propTypes = {
  lazy: _react2.default.PropTypes.bool
};

MaybeLazyLoad.defaultProps = {
  lazy: false
};

exports.default = MaybeLazyLoad;