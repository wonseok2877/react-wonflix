import React from "react";
import { movieApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";
/* 구상 : 처음 search페이지에 들어갔을 떄 searchTerm은 empty string이고,
laoding은 false에 error은없어. 검색하고 엔터누르면 이제 loading이 true
되고 그 movieResults와 tvResults를 state에 넣을거야.
1. handleSubmit : JSX의 onSubmit을 통해서 실행될 함수. form에서 text를 입력하고 enter을 누르면,
loading이 true가 되고, searchTerm의 값을 넣으면서
 axios GET요청을 한다.다 받은 후엔  */

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieResults: null,
      tvResults: null,
      searchTerm: "",
      loading: false,
      error: null,
    };
  }

  /* 얘네는 마운팅 단계에서 실행 안하네? 당연하긴 한데
   두서가 없어보인다. 뭔가 다른 함수 없을까.
   아니면 그냥 얘네가 componentDidMount처럼 특정 시점을 표시하는 것일 
   수도 있겟네?   */

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    // 로직 : 공백은 검색 못하게 함.
    // trim() : 스페이스만 누르고 쳐도 검색 안 됨
    if (searchTerm.trim() !== "") {
      this.searching(searchTerm);
      // 검색후엔 state를 빈 string 값으로.
      this.setState({ searchTerm: "" });
    }
  };

  /* ? : 왜 이 함수에선 searchTerm캐치하는게 한 박자씩 느리지 
  ! : 다른데서 값을 보내면 한 박자가 느린 것 같다. 반면 여기서 아예
  event를 인식하면 제 때 인식한다. 왜일 까? */
  handleChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ searchTerm: value });
  };

  searching = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults,
      });
    } catch (err) {
      this.setState({ error: "there is an Error" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    console.log("rendered");
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    return (
      <div>
        <SearchPresenter
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          movieResults={movieResults}
          tvResults={tvResults}
          searchTerm={searchTerm}
          loading={loading}
          error={error}
        />
      </div>
    );
  }
}

export default SearchContainer;
