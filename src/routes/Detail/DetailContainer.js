import React, { Component } from "react";
import { movieApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

/* 구상 : 일단 detail의 전제는, movie든 tv든 하나의 id를 갖고 
하나만 찾는다는 것. id로 해당 콘텐츠의 정보를 axios를 통해서 가져오는거? */

class DetailContainer extends Component {
  constructor(props) {
    super(props);
    // ! : constructor에서 인자값으로 받아오는 props가 this.props와 같다.
    // ? : constructor가 뭔데 props를 아무렇지도 않게 받아오는거?
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      loading: true,
      error: null,
      /* 로직 : 
     path에 따라서 한 component가 다양한 모습을 보여줄 수 있는 방법 !
    전체 class component자체에다가 pathname에 따라서
    다른 변수와 값을 넣어준당. 만약 rerender하고 싶으면 state에 넣어주면 됨.*/
      // 해당 class component에다가 새로운 아이를넣어준다 !
      // props에서 온 걸 디폴트 state로써 가지고 놀기
      // includes() !
      isMovie: pathname.includes("/movie/"),
      isTv: pathname.includes("/tv/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        // parameter의 이름은 Router에서 정해준 path이름과 일치해야 한다. url.
        params: { id },
      },
      history: { push },
    } = this.props;

    /* 로직 : url에 이상한게 들어갔을 경우에 홈페이지로 보내고 싶어. 
    isNaN() : NaN인지 아닌지를 true 혹은 false값으로 뱉어주는 함수.
    ? : 근데 알파벳이 하나라도 들어있으면 그걸 잡아내지를 못하는데? */

    // Number() !
    if (isNaN(Number(id))) {
      console.log("fuck off!");
      // 우리는 함수 실행을 끝내기 위해서 return을 쓸거야.
      return push("/");
    }

    /* ! : 유연하게 생각하자. state로써 정보를 넣을 수도 잇고,
    component자체 즉 this에다가 넣을 수도 있음. */
    const { isMovie, isTv } = this.state;

    /* 로직 : tv는 movie든 resultData 변수에다가 값을 넣게 될거야. 
    componentDidMount함수 scope의 변수로써 따로 정의해놓은 뒤에,
    finally 블럭에서 state로써 넣는것. 
    이렇게 유연하게 변수를 다룰 수 있다 !*/
    let resultData = null;

    try {
      if (isMovie) {
        /* ES6 destructure 문법ㅋㅋㅋ이걸 벗겨내네. 원래는 const를 쓰지만
        여기서는 위에서 let으로 정의해놓은 친구에다가 넣을거기 때문에 const가 
        안통한다. : 괄호안에 넣어주면 끝. 
        원래 있던 변수에다가 넣는다는 뜻인듯.  */
        ({ data: resultData } = await movieApi.movieById(id));
      }
      if (isTv) {
        ({ data: resultData } = await tvApi.tvById(id));
      }
      console.log(resultData);
    } catch (e) {
      this.setState({ error: "Can't find 👿" });
    } finally {
      this.setState({ loading: false, result: resultData });
    }
  }

  /* history의 여러가지 함수.
  this.props.history.goForward();
  goBack, goForward, go, push 등등 */

  render() {
    const { result, loading, error } = this.state;
    return (
      <div>
        <DetailPresenter result={result} loading={loading} error={error} />
      </div>
    );
  }
}

export default DetailContainer;
