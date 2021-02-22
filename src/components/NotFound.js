import React from "react";
import PropTypes from "prop-types";

class NotFound extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    console.log(this.props);
    const { text } = this.props;
    return (
      <div className="flex flex-row justify-center h-80">
        <h1 className="text-5xl h-20 text-purple-700">{text}</h1>
      </div>
    );
  }
}

export default NotFound;
