import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

class DetailPresenter extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  render() {
    console.log(this.props);
    /* ! : result를 destructure할 수 없다. loading이 끝나기 전이기 때문에 null값이기 때문.  */
    const { loading, error, result } = this.props;
    return (
      <div>
        {loading ? (
          <Loader />
        ) : result ? (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`}
              alt="background"
              className="absolute filter:blur(10px) top-20 left-0 w-screen h-screen"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default DetailPresenter;
