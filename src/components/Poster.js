import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Poster extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMovie: PropTypes.bool,
  };

  render() {
    const { id, imageUrl, title, rating, year, isMovie } = this.props;
    return (
      <Link
        to={isMovie ? `/movie/${id}` : `/tv/${id}`}
        current={isMovie ? `/movie/${id}` : `/tv/${id}`}
      >
        <div className="text-white">
          {
            <img
              src={
                imageUrl
                  ? `https://image.tmdb.org/t/p/w300/${imageUrl}`
                  : require("../No_Image_Available.jpg").default
              }
              alt="background"
              className="w-60 h-80"
            />
          }
          <span>
            <span role="img" aria-label="rating">
              ⭐
            </span>
            {rating}/10
          </span>
          <h1>{title}</h1>
          <h1 className="text-white opacity-70">{year}</h1>
        </div>
      </Link>
    );
  }
}
export default Poster;
