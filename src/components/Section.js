import PropTypes from "prop-types";
import React from "react";

class Section extends React.Component {
  // ? : static은 또 뭐냐. class 배워야겠다.
  static propTypes = {
    title: PropTypes.string,
    /* children : props이긴 한데, 태그 안쪽에서 보내주는게 아니라
      태그 사이의 애기들을 칭한다. 텍스트.  */
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  render() {
    const { title, children } = this.props;
    console.log(this);
    return (
      <div>
        {/* html head상의 title을 바꿀 수 있음 ! */}
        <h1 className="text-5xl">{title}</h1>
        <div className="flex flex-wrap justify-evenly mb-10 bg-gray-900">
          {children}
        </div>
      </div>
    );
  }
}

export default Section;
