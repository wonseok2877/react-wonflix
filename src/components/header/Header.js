import React from "react";
import { Link, withRouter } from "react-router-dom";
/* CSS 객체화 !
css에다가 module이름을 붙여준 뒤 javascript에서처럼 import 해준다.
그 안에 정의된 각각의 style들을 객체로써 쓸 수 있다.
module화된 CSS파일은 자동으로 class이름 뒤에 랜덤숫자를 넣어줘서,
다른 폴더의 CSS파일과 겹치지 않게 해준다.
class이름도 javascript 형식으로 camelCase로 써줘야댐ㅋㅋ  */

/* Component와 그냥 JSX의 차이는 무엇인가?
지금 Header은 아무런 기능도 안하는 그냥 JSX이다. htmlㅋㅋ
그냥 이렇게만 해도 되는 경우와 절대 이렇게 하면 돌아가지 않는 경우는 무엇인가?
props와 state를 굴려야 하는 경우?
HTTP 통신을 해야 하는 경우?
특정 로직을 만들어야 하는 경우? */

/* 그냥 JSX로 정의했을 때 !
Error: Element type is invalid: expected a string (for built-in 
components) or a class/function (for composite components) 
but got: object. 
built-in component혹은 class/function component를 element타입으로써
기대했지만, 객체 타입을 받았으므로 element타입이 유효하지 않다고 한다.
*/

/* 구상 : Header은 element, 즉 component일 필요가 없다. 
Router의 역할은 하되
뭔가 data를 받거나 렌더링을 새로 할 필요가 없기 때문. */

/* ? : withRouter과 Link ? !
? current는 또 뭐야.
a href와 달리, 페이지를 옮기지 않은 채 React Router의 힘으로 옮긴다.
그래서 새로 로딩할 필요가 없다. 가상의 DOM에서 갖고 노는듯 ! */
const Header = withRouter(({ location: { pathname } }) => (
  <ul className="bg-pink-600">
    <li current={pathname === "/movie"}>
      <Link to="/movie">Movies</Link>
    </li>
    <li current={pathname === "/tv"}>
      <Link to="/tv">TV</Link>
    </li>
    <li current={pathname === "/search"}>
      <Link to="/search">Search</Link>
    </li>
  </ul>
));

export default Header;
