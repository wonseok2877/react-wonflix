import React from "react";
import PropTypes from "prop-types";
import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Poster from "../../components/Poster";

class TVPresenter extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }
  /* ? : && 와 ? : 중에서 뭐가 더 좋은 방법일까?  */
  render() {
    console.log(this.props);
    const { airingToday, popular, topRated, error, loading } = this.props;
    return (
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error text={error} color="red" />
        ) : (
          <div>
            {airingToday && airingToday.length > 0 && (
              <Section title="Airing Today">
                {airingToday.map((t) => (
                  <Poster
                    id={t.id}
                    title={t.original_name}
                    // substring() : string을 쪼갠다.
                    year={t.first_air_date.substring(0, 4)}
                    imageUrl={t.poster_path}
                    rating={t.vote_average}
                    isMovie={false}
                  />
                ))}
              </Section>
            )}
            {popular && popular.length > 0 && (
              <Section title="Popular">
                {popular.map((t) => (
                  <Poster
                    id={t.id}
                    title={t.original_name}
                    year={t.first_air_date.substring(0, 4)}
                    imageUrl={t.poster_path}
                    rating={t.vote_average}
                    isMovie={false}
                  />
                ))}
              </Section>
            )}
            {topRated && topRated.length > 0 && (
              <Section title="Top Rated">
                {topRated.map((t) => (
                  <Poster
                    id={t.id}
                    title={t.original_name}
                    year={t.first_air_date.substring(0, 4)}
                    imageUrl={t.poster_path}
                    rating={t.vote_average}
                    isMovie={false}
                  />
                ))}
              </Section>
            )}
          </div>
        )}
      </>
    );
  }
}

TVPresenter.propTypes = {
  popular: PropTypes.array,
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
