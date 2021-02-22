import React, { Component } from "react";
import PropTypes from "prop-types";
import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import Poster from "../../components/Poster";

class SearchPresenter extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  /* props를 어떻게 여기서 제어함? state로 바꾼다고 쳐도 그걸 
  부모한테 올려보내야 할 것 같은데?
  여기서 props에 손댈 수 있나?
  :TypeError: Cannot assign to read only property 'searchTerm' of object '#<Object>'
   */
  /* ! : 부모로부터 부모의 state를 바꾸는 함수는 상속받을 수 있다 !
  철저한 이행 관계.  */

  /* 왜 input안에 value를 가져야 할까?
  우리는 input을 제어할 수 있어야 하거든. */
  render() {
    const {
      searchTerm,
      handleSubmit,
      handleChange,
      loading,
      error,
      movieResults,
      tvResults,
    } = this.props;

    /* 왜 input value를 지정하는거지? value 안 넣어도 onChange를 통해 바꿀 수 있음
    ! : 반대로 우리가 input값을 바꾸고 싶을 떈 어떡하게? 부모쪽에서
    preventDefault를 해놨기 때문에, 이제 form쪽에서 값 초기화를 못 시킴.
    그래서 value로 부모의 state를 넣어놓는거다. 언제든지 부모쪽에서 state를 
    바꿀 수 있게 하려고. 추적할 수도 있고.  */

    /* ! : form위에서 엔터키의 기본값은 submit이다. */
    return (
      <>
        <div>
          {/* 함수형식으로 안 해도 결과는 같다. 또힌 자바스크립트 기반이기 
          때문에, 여기서 인자값을 안 줘도 브라우저 상의 이벤트를 인자값으로 줄거다. */}
          <form onSubmit={handleSubmit}>
            <input
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search Movies OR TV shows.."
              className="text-xl w-3/6"
            />
          </form>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error text={error} color="blue" />
          ) : (
            <div>
              {movieResults && movieResults.length > 0 ? (
                <Section title="movieeee">
                  {movieResults.map((m) => (
                    <Poster
                      id={m.id}
                      title={m.original_title}
                      year={m.release_date && m.release_date.substring(0, 4)}
                      imageUrl={m.poster_path}
                      rating={m.vote_average}
                      isMovie={true}
                    />
                  ))}
                </Section>
              ) : null}
              {tvResults && tvResults.length > 0 ? (
                <Section title="tvvvvvvv">
                  {tvResults.map((t) => (
                    <Poster
                      id={t.id}
                      title={t.original_name}
                      year={
                        t.first_air_date && t.first_air_date.substring(0, 4)
                      }
                      imageUrl={t.poster_path}
                      rating={t.vote_average}
                      isMovie={false}
                    />
                  ))}
                </Section>
              ) : null}
              {/* ㅋㅋㅋstatus code가 아니라 array 길이로 operator을 거네.
              그래도 404notFound라는 조건이랑 같으니까 뭐 상관은 없다.  */}
              {movieResults &&
                tvResults &&
                movieResults.length === 0 &&
                tvResults.length === 0 && (
                  <NotFound text={`Nothing found 🤣`} />
                )}
            </div>
          )}
        </div>
      </>
    );
  }
}

SearchPresenter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default SearchPresenter;
