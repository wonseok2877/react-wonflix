import React from "react";
import PropTypes from "prop-types";

class Error extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
  };

  render() {
    console.log(this.props);
    const { text, color } = this.props;
    return (
      <div className="flex flex-row justify-center h-80">
        <h1 className={`text-5xl h-20 text-${color}-500`}>{text}</h1>
      </div>
    );
  }
}

export default Error;
