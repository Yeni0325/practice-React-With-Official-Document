import { useState, useRef, useEffect } from "react"
import "./App.css";

// << 3️⃣ Escape Hatches : 탈출구 >>

// -------------------------------------------------------------------------------

// < 3-1. Referencing values with Refs : ref로 값 참조하기 >
/*
  const ref = useRef(value)
  함수형 컴포넌트에서 useRef를 부르면 ref Object를 반환한다.
  ref Object는 { current : value } 와 같이 생겼다.
  인자로 넣어줬던 value는 ref 안에 있는 current 안에 저장이 된다.

  ref 오브젝트는 수정이 가능하기 때문에 언제든 원하는 값으로 변경이 가능하다.
  ex) const ref = useRef("hi");  =>  { current : "hi" }
      ref.current = "hello"      =>  { current : "hello" }
      ref.current = "nice"       =>  { current : "nice" }
  
  반환된 ref는 컴포넌트의 전 생애주기를 통해 유지가 된다. 즉, 컴포넌트가 amount 되기 까지 값을 유지한다.
*/

// 예제1.
// export default function App(){
//   const [count, setCount] = useState(0);
//   const countRef = useRef(0);

//   const increaseCountState = () => {
//     setCount(current => current + 1);
//   }

//   const increaseCountRef = () => {
//     countRef.current = countRef.current + 1;
//     console.log("Ref : ", countRef.current);
//   }

//   return(
//     <div>
//       <p>State : {count}</p>
//       <p>Ref : {countRef.current}</p>
//       <button onClick={increaseCountState}>State 올려</button>
//       <button onClick={increaseCountRef}>Ref 올려</button>
//     </div>
//   );
// }

// 예제2.
// export default function App(){
//   const [renderer, setRenderer] = useState(0);
//   const countRef = useRef(0);
//   let countVar = 0;

//   const doRendering = () => setRenderer(current => current + 1);

//   const increaseRef = () => {
//     countRef.current = countRef.current + 1;
//     console.log('ref : ', countRef.current);
//   };
//   const increaseVar = () => {
//     countVar = countVar + 1;
//     console.log('var : ', countVar);
//   };

//   const printResults = () => {
//     console.log(`ref : ${countRef.current}, var : ${countVar}`);
//   }

//   return(
//     <div>
//       <p>Ref : {countRef.current}</p>
//       <p>Var : {countVar}</p>
//       <button onClick={doRendering}>렌더!</button>
//       <button onClick={increaseRef}>Ref 올려</button>
//       <button onClick={increaseVar}>Var 올려</button>
//       <button onClick={printResults}>Ref, Var 값 출력</button>
//     </div>
//   );
// }

// 예제3.
// export default function App(){
//   const [count, setCount] = useState(1);
//   const renderCount = useRef(1);

//   useEffect(() => {
//     renderCount.current = renderCount.current + 1;
//     console.log('렌더링 수 : ', renderCount.current);
//   });

//   return(
//     <div>
//       <p>Count : {count}</p>
//       <button onClick={() => setCount(current => current + 1)}>올려</button>
//     </div>
//   );
// }

// 예제4.
export default function App(){
  const inputRef = useRef();

  useEffect(() => {
    // console.log(inputRef);
    inputRef.current.focus();
  }, []);

  const login =  () => {
    alert(`환영합니다 ${inputRef.current.value}님!`);
    inputRef.current.focus();
  }

  return(
    <div>
      <input ref={inputRef} type="text" placeholder="username" /> 
      <button onClick={login}>로그인</button>
    </div>
  );
}