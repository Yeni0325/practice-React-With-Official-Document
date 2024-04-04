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
// export default function App(){
//   const inputRef = useRef();

//   useEffect(() => {
//     // console.log(inputRef);
//     inputRef.current.focus();
//   }, []);

//   const login =  () => {
//     alert(`환영합니다 ${inputRef.current.value}님!`);
//     inputRef.current.focus();
//   }

//   return(
//     <div>
//       <input ref={inputRef} type="text" placeholder="username" /> 
//       <button onClick={login}>로그인</button>
//     </div>
//   );
// }

// export default function Stopwatch() {
//   const [startTime, setStartTime] = useState(null);
//   const [now, setNow] = useState(null);
//   const intervalRef = useRef(null);

//   function handleStart() {
//     setStartTime(Date.now());
//     setNow(Date.now());

//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setNow(Date.now());
//     }, 10);
//   }

//   function handleStop() {
//     clearInterval(intervalRef.current);
//   }

//   let secondsPassed = 0;
//   if (startTime != null && now != null) {
//     secondsPassed = (now - startTime) / 1000;
//   }

//   return (
//     <>
//       <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
//       <button onClick={handleStart}>
//         Start
//       </button>
//       <button onClick={handleStop}>
//         Stop
//       </button>
//     </>
//   );
// }

// -------------------------------------------------------------------------------

// < 3-2. Manipulating the DOM with Refs : ref로 DOM 조작하기 >
/*
  부모노드가 자식노드의 DOM에 접근하고자 ref를 전달할 때는 일반적인 ref를 사용할 수 없고, forwardRef를 사용해야한다.
*/
// import MyInput from './MyInput.jsx';

// export default function App(){
// 	const inputRef = useRef();
	
// 	const focus = () => {
// 		inputRef.current.focus();
// 	};
	
// 	return(
// 		<div>
// 			{/*<input ref={inputRef} />*/}
// 			<MyInput ref={inputRef}/>
// 			<button onClick={focus}>집중</button>
// 		</div>
// 	);
// }

/*
	다음과 같이 새 할 일을 추가하고 목록의 마지막 하위 항목까지 화면을 아래로 스크롤하는 코드를 작성했다.
	그러나 마지막에 추가한 할 일이 아닌 바로 앞에 있던 할 일로 스크롤되는 것을 볼 수 있다.

	* 이는 state가 비동기로 작동하기 때문에 setTodos([ ...todos, newTodo])가 있어도 바로 밑의 스크롤까지 진행 후 새로운 요소를 추가하기 떄문이다.

	이때 flushsync 를 사용해서 문제를 해결할 수 있다.

	정말 간단하게 말하면 async await으로 보면된다.

	비동기적인 코드를 강제로 동기적으로 만들고 react에서 리렌더링을 강제하도록 한다.

	단, 위와 같은 처리를 useEffect를 통해서도 할 수 있기 때문에 특별한 경우가 아니라면 useEffect를 사용하는 것이 좋다.
*/

import { flushSync } from "react-dom";

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    // setTodos([ ...todos, newTodo]);
		flushSync(() => {setTodos([ ...todos, newTodo])});
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}