import React from "react";
import PropTypes from "prop-types";
import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Poster from "../../components/Poster";

class MoviePresenter extends React.Component {
  /* ! : 자식 component는 부모 따라서 render된다.
   constructor : 이 시점에서는 component를 소개만 하기 때문에, 부모로부터
   data를 받아오기 이전이다. 자식의 첫번째 render도 마찬가지.
   부모가 setState를 함에 따라 data가 바뀌고, 자식을 비롯해서 render()을
   여러번 실행하게 된다. 
   이 때 New Props라는 trigger조건이 성립하고, 똑같이 render되는 것.*/

  /* ? : 새로고침과, 저장 후 자동실행의 차이점 ? 
  새로고침을 하면 props값들이 null이 되고,
  React쪽에서 저장을 해서 자동 리렌더링을 하면 값들이 들어온다. 왤까 ?
  리액트쪽에서 전에 받아온 data를 기억하는건가?   */
  constructor(props) {
    super(props);
    /* ? : 마지막 렌더링이 아닌 처음 mount될 때 이 component가
    render된다. 그래서 update를 내가 해줘야 할 듯? 
    다른 방법이 있을까.
    ! : constructor시점에서 백날 찾아봐야 소용이 없는거. */

    /* ? : this에서는 props들이 loading도 false고 다 잘 가져와졌는데
    왜 this.props에서는 loading이 true이지?  */
    console.log("constructor");
  }

  componentDidMount() {
    console.log("mounted");
  }

  /* ? : componentDidUpdate는 무슨 기능을 하는거?
  항상 render() 다음에 실행되는데
  Can work with DOM, run side effects, schedule updates 라는게 
  무슨말 ??  */

  render() {
    console.log("rendered");
    const {
      nowPlaying,
      upComing,
      popular,
      topRated,
      error,
      loading,
    } = this.props;
    console.log(this.props);
    /* 0. 전제 : 각 Presenter가 Container로부터 fetched data를 받은 뒤,
     각 Array으 아이들과 그 안의 key의 value을 map()을 통해 자식으로 보낸다.
    1. Section이 children으로 props를 받아서 감싸고 있다.
    2. Poster은 tv냐 movie냐 상관없이 똑같은 props를 받아야 한다.
    3. 따라서 Presenter에서 각각의 data를 Poster의 틀에 맞게 보내줘야 함. */
    return (
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error text={error} color="yellow" />
        ) : (
          <div>
            {nowPlaying && nowPlaying.length > 0 && (
              <Section title="Now Playing">
                {nowPlaying.map((m) => (
                  <Poster
                    id={m.id}
                    title={m.original_title}
                    year={m.release_date.substring(0, 4)}
                    imageUrl={m.poster_path}
                    rating={m.vote_average}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {upComing && upComing.length > 0 && (
              <Section title="Upcoming">
                {upComing.map((m) => (
                  <Poster
                    id={m.id}
                    title={m.original_title}
                    year={m.release_date.substring(0, 4)}
                    imageUrl={m.poster_path}
                    rating={m.vote_average}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {popular && popular.length > 0 && (
              <Section title="Popular">
                {popular.map((m) => (
                  <Poster
                    id={m.id}
                    title={m.original_title}
                    year={m.release_date.substring(0, 4)}
                    imageUrl={m.poster_path}
                    rating={m.vote_average}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {topRated && topRated.length > 0 && (
              <Section title="Top Rated">
                {topRated.map((m) => (
                  <Poster
                    id={m.id}
                    title={m.original_title}
                    year={m.release_date.substring(0, 4)}
                    imageUrl={m.poster_path}
                    rating={m.vote_average}
                    isMovie={true}
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

MoviePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upComing: PropTypes.array,
  popular: PropTypes.array,
  topRated: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default MoviePresenter;
