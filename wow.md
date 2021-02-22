깨달은 점들과 리액트 공식문서를 토대로 정리하자.
전제와 전제 그리고 필연적인 결과 도출. 
# JSX
[리액트 공식 문서](https://reactjs.org/docs/introducing-jsx.html)
## what the fuck is JSX?
> JSX is syntax extension to JavaScript. stands for JavaScript XML. JSX follows XML rules.

질문 : 그래서 기존 jacascript의 DOM이랑 차이점이 뭔데?

답변 : createElement()과 appendChild() 없이도 DOM을 조작할 수 있다! 그리고 JSX는 HTML 태그들을 react elements로 변환시켜준다.

> JSX produces React “elements”.

질문 : element란 무엇인가? HTML element를 말하는건가?
React가 가상으로 만들어내는 DOM과 연관이 있는거? ! 

맞네. 실제 html document에 인식 가능한 DOM을 보내준다는 거 같다. 이게 reactDOM.render을 통해서 해석되고 innerHTML함수와 비슷하게 넣어주는거고.

답변 필요


## Why JSX?


React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.
질문 : JSX가 아닌 다른 표현도 있는가? 

답변 필요.

질문 : AJAX랑 연결되는 개념인가?

답변 필요.

# Component와 state
## Component
> Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML via a render() function.


질문 : Component 왜 씀? element 여러 개 render()에다가 넣으면 안 됨?

답변 : React의 자동 렌더링 기능 안 쓸거야?ㅋㅋㅋ 그냥 element랑 함수랑...뭐야 다 쓸 수 있을 것 같은데? 새로고침만 해주면. 

## Class Component
The component also requires a render() method, this method returns HTML.
## function Component

# React DOM
! : ReactDOM의 render()함수와 각 Component의 render()함수는 아예 다른 얘기다. 
```js
const element = <h1>just a element</h1>
ReactDom.render(element, document.querySelector("#root"))
```
이 경우에, element가 달라질 때마다 리렌더링 해주지 않는다. 물론 그동안 뭔가를 실행하는 일도 없다. 그냥 index.js라는 파일이 npm start할 때마다 한번 씩 실행되는 것 뿐이다.

즉, 라이프사이클은 component에서 이루어진다는 것. reactDOM은 render()의 인자값으로 들어간 무언가를 토대로 가상의 DOM을 만들고 html문서에다가 넣어주는 역할 딱 거기까지다. 

# axios configuration
## Request URL
  axios인스턴스의 baseUrl, params와 이곳의 url이 합쳐져서 요청 url이 만들어진다.
  HTTP method는 GET. status code는 서버쪽에서 잘 됬다고 200을 던져주고.


# LifeCycle of Component
class component로 이해하자.

## Mounting

### constructor

## render()
질문 : If there is no await, render() is triggered only once🤔 in whole Mounting time, even if there is a looooot of setState in the componentDidMount().

So what does it mean? Is it a feature of React that prevents many re-rendering? Or am I misunderstanding javascript and ajax ?

답변 필요



## useEffect를 안 쓰네? !
If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as **componentDidMount, componentDidUpdate, and componentWillUnmount** combined.


## parseInt() vs Number()
Number() ! : 밑의 뻘짓을 한 함수로 대신해준다.ㅋㅋㅋㅋㅋ 
```js
    /* id를 string array로 바꾼뒤, 하나하나 NaN인지 아닌지 대조해봄.
   그렇게 새로 만들어진 array의 길이가 원래 id array길이보다 짧을 경우,
   거기엔 알파벳이 들어있는 거고 우리는 그걸 원하지 않는다. 바로 push(). */

     const numOrString = id
      .split("")
      .map((i) => (isNaN(parseInt(i)) ? false : true));
    const numLength = numOrString.filter((i) => i === true).length;

// 이거랑 차이가 없다...
    Number(id)
```

## includes()
특정 String값을 찾을 수 있도록 도와준다!