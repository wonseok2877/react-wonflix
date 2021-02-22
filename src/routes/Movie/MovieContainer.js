import React from "react";
import { movieApi } from "../../api";
import MoviePresenter from "./MoviePresenter";

/* HomeContainer will be a full React component with state! */
/* 1. LifeCycle 시작
1-1. 전제 : class Component. React의 Component를 extend한다.
 */
class MovieContainer extends React.Component {
  /* 1-2. constructor
  여기선 props참고할 필요 없으니 패스
  state를 계획하고 디폴트 값을 정해준다. 안해줘도 상관은 없지만
  확실하게 하기 위해서. */
  // ? : constructor은 arrow function으로 안 써지네?
  constructor(props) {
    super(props);
    this.state = {
      nowPlayingResults: null,
      upComingResults: null,
      popularResults: null,
      topRatedResults: null,
      error: null,
      loading: true,
    };
  }
  /* 1-3. 마운팅 : componentDidMount 함수
 두가지 옵션. 전체 API요청을 여기서 하거나, 
 각각의 요청을 분리된 함수로 만들어서 요청하거나. */

  /* asynchronous 프로그래밍
  async & await을 쓰지 않을 경우 javascript는 기다려주지 않고,
  Promise {pending}이라는 값을 내뱉는다. 이것도 값이긴 하지만,
  우리가 원하는건 Promise가 끝날 때까지 기다리는거다.
  질문 : 애초에 javascript는 왜 asynchronous일까? 뭐가 좋은데?
  다 기다려주면 안 돼?
  질문 : Promise는 머야?? */
  componentDidMount = async () => {
    // try 블럭
    try {
      /* ! : async await은 함수를 실행하는 순간에만 하면 돰. 
      그 함수에 대한 정의든 뭐든 다른 파일에서는 async같은거
      할 필요가 없다. 이건 기초적인 javascript 작동 원리잖아..*/
      const {
        data: { results: nowPlayingResults },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upComingResults },
      } = await movieApi.upcoming();
      const {
        data: { results: popularResults },
      } = await movieApi.popular();
      const {
        data: { results: topRatedResults },
      } = await movieApi.topRated();

      // setState(). data와 이름을 미리 맞췄기 때문에 간단하게.
      this.setState({
        nowPlayingResults,
        upComingResults,
        popularResults,
        topRatedResults,
      });
      // catch 블럭
    } catch (error) {
      /* 여기선 throw 안 쓰네?
      질문 : throw는 뭐야? 그리고 new 는 뭐고 Error은 ㅜ머야?
      graphqLError도 있었는데 그건 뭐야 ? */
      this.setState({
        error: "Can't get movies info🤔",
      });
      /* finally 블럭
      : 항상 실행이 보장되어야 할 뒷정리용 코드.
      생략할 수 있지만, try블록은 catch나 finally중 최소한 
      하나 이상의 블록과 사용되어야만 한다. */
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  /* 렌더링이 총 3번 된다. 즉, render()이 3번 실행된다.
  componentDidMount시점에서 setState가 2번 됬고, 매번 render()
  함수의 trigger작용을 해서 render이 각각 실행되는 것! */

  render = () => {
    const {
      nowPlayingResults,
      upComingResults,
      popularResults,
      topRatedResults,
      error,
      loading,
    } = this.state;
    return (
      <MoviePresenter
        nowPlaying={nowPlayingResults}
        upComing={upComingResults}
        popular={popularResults}
        topRated={topRatedResults}
        error={error}
        loading={loading}
      />
    );
  };
}

export default MovieContainer;
