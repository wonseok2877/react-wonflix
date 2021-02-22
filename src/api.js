import axios from "axios";
/* 1. axios를 통해 API data가져오기*/

/* 1-1. axios.create() !
axios는 인스턴스를 생성할 수 있다.
여러번 반복되는 url이나 configuration을 한 곳에서 설정할 수 있음! */
const wowAxios = axios.create({
  // 기본 url
  /* 1-2. axios는 기본적으로 HTTP 통신규약을 따를 수밖에 없다.
  그러므로 여기선 request headers에 담길 정보들을 정의한다.
  ? : HTTP 통신규약을 정말로 알고 있는가?  */
  baseURL: "https://api.themoviedb.org/3",
  /* ? : params? 작동원리가 어떻게 되는거지.
  API사이트쪽에서 요구하는 이름 그대로 넣어줘야 되는건가
  그니까 이게 request  headers에 들어가는거야 ? */
  /* Query String Parameters !
  Network의 Headers에 parameters 칸이 생긴다.
  해당 API사이트로는 api_key=bd4caebde93cff205b912a48554bbd5e&language=en-US&page=1
  식으로 얘네가 다 합쳐져서 url적으로 알아볼 수 있게 만들어준다.
  req.params를 말하는건가? */
  params: {
    api_key: "bd4caebde93cff205b912a48554bbd5e",
    language: "en-US",
  },
});

/* 1-3. 한 곳에서 여러 url에대한 요청을 정의해버리기! 아예 객체로 감싸네.
이건 그냥 코딩 스타일이다. 하나하나 다 export const해줘도 되고
movieApi와 TVApi를 나누지 않고 하나의 객체에다 싹다 넣어도 됨
혹은, wowAxios를 export하고 특정 component에서 써도 된다.  */
/* ! : 잠만 이거 graphQL쪽에서도 이렇게 쓸 수 있겠는데?
 */
export const movieApi = {
  /* 1-4. axios의 GET방식
  create()에서 정한 configuration이 있기 때문에 여기선 url만
  넣어준다. 혹은 객체형태 안에다가 wowAxios({method:"get", url:"blahblah"})
  식으로 해도 똑같은 결과가 나온다. fetch API와 동일한 형식. */
  nowPlaying: () => wowAxios.get("movie/now_playing"),
  upcoming: () => wowAxios.get("movie/upcoming"),
  topRated: () => wowAxios.get("movie/top_rated"),
  popular: () => wowAxios.get("movie/popular"),
  movieById: (id) =>
    wowAxios.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (teeeeeerm) =>
    wowAxios.get("search/movie", {
      params: {
        // encodeURIComponent : url쪽에서 공백 혹은 특수문자를 encoding을 해줘야함.
        // 근데 axios에서 지원해준다고 한다ㅋㅋ
        query: teeeeeerm,
      },
    }),
};

export const tvApi = {
  topRated: () => wowAxios.get("tv/top_rated"),
  popular: () => wowAxios.get("tv/popular"),
  airingToday: () => wowAxios.get("tv/airing_today"),
  tvById: (id) =>
    wowAxios.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    wowAxios.get("search/tv", {
      params: {
        query: term,
      },
    }),
};
