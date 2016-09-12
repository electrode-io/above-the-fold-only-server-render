import React, {Component, PropTypes} from "react";


class SomeComponent extends Component {
  getChildContext() {
    return {
      aboveTheFoldOnlyServerRender: {
        CoolComponent: true,
        NeatComponent: false
      }
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

SomeComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

SomeComponent.childContextTypes = {
  aboveTheFoldOnlyServerRender: PropTypes.shape({
    CoolComponent: PropTypes.bool,
    NeatComponent: PropTypes.bool
  })
};

export default SomeComponent;
