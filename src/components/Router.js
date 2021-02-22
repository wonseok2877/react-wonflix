import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TVContainer from "../routes/TV";
import HomeContainer from "../routes/Home";
import MovieContainer from "../routes/Movie";
import SearchContainer from "../routes/Search";
import DetailContainer from "../routes/Detail";
import Header from "./header";

/* 니꼴라스 코딩 방식 :  Router파일을 따로 만들어서 
철저히 기능별로. */

/* BrowserRouter !
HTML5 history API를 쓴다. 프론트와 URL를 매칭 맞추기 위해.
HashRouter은 window.location.hash라는 property를 이용하는것뿐
별 차이 없다. */
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/movie" component={MovieContainer} />
        <Route exact path="/tv" component={TVContainer} />
        <Route path="/search" component={SearchContainer} />
        {/* 두개의 path에서 하나의 component를 실행한다.
        ? : 왜? Search쪽에서는 그냥 둘 다 가져왔잖아. 
        tv이냐 movie이냐에 따라서 다른 요청을 해야하니까? 
        조건문으로 다른 component를 return할 수는 없을까?
        원하는 params가 달라서인가?  */}
        <Route path="/movie/:id" component={DetailContainer} />
        <Route path="/tv/:id" component={DetailContainer} />
        <Redirect exact from="/*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
