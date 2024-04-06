import { useState, useRef, useEffect, useMemo } from "react"
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

// import { flushSync } from "react-dom";

// export default function TodoList() {
//   const listRef = useRef(null);
//   const [text, setText] = useState('');
//   const [todos, setTodos] = useState(
//     initialTodos
//   );

//   function handleAdd() {
//     const newTodo = { id: nextId++, text: text };
//     setText('');
//     // setTodos([ ...todos, newTodo]);
// 		flushSync(() => {setTodos([ ...todos, newTodo])});
//     listRef.current.lastChild.scrollIntoView({
//       behavior: 'smooth',
//       block: 'nearest'
//     });
//   }

//   return (
//     <>
//       <button onClick={handleAdd}>
//         Add
//       </button>
//       <input
//         value={text}
//         onChange={e => setText(e.target.value)}
//       />
//       <ul ref={listRef}>
//         {todos.map(todo => (
//           <li key={todo.id}>{todo.text}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// let nextId = 0;
// let initialTodos = [];
// for (let i = 0; i < 20; i++) {
//   initialTodos.push({
//     id: nextId++,
//     text: 'Todo #' + (i + 1)
//   });
// }


// -------------------------------------------------------------------------------

// < 3-3. Synchronizing with Effects : Effect와 동기화하기 >

// export default function App(){
//   const [count, setCount] = useState(1);
//   const [name, setName] = useState('');

//   const handleCountUpdate = () => {
//     setCount(current => current + 1);
//   }

//   const handleInputChange = (e) => {
//     setName(e.target.value);
//   }

  // // 렌더링될 때 마다 매번 실행됨 - 렌더링 이후
  // useEffect(() => {
  //   console.log('렌더링...');
  // });

  // // 마운팅 + count가 변화할 때 마다 실행됨
  // useEffect(() => {
  //   console.log('count 변화');
  // }, [count]);

  // // 마운팅 + name이 변화할 때 마다 실행됨
  // useEffect(() => {
  //   console.log('name 변화');
  // }, [name]);

//   useEffect(() => {
//     console.log('마운팅..');
//   }, []);

//   return(
//     <div>
//       <button onClick={handleCountUpdate}>Update</button>
//       <span>count : {count}</span>
//       <input type="text" value={name} onChange={handleInputChange}/>
//       <span>name : {name}</span>
//     </div>
//   );
// }

// -------------------------------------------------------------------------------

// import Timer from './Timer.jsx';

// export default function App(){
//   const [showTimer, setShowTimer] = useState(false);

//   return(
//     <div>
//       {showTimer && <Timer/>}
//       <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
//     </div>
//   );
// }

// -------------------------------------------------------------------------------

// function VideoPlayer({src, isPlaying}){
//   const ref = useRef(null);

//   useEffect(() => {
//     if(isPlaying){
//       ref.current.play();
//     } else {
//       ref.current.pause();
//     }
//   }, [isPlaying]);
//   console.log(isPlaying);

//   return <video ref={ref} src={src} loop playsInline />;
// }

// export default function App(){
//   const [isPlaying, setIsPlaying] = useState(false);

//   return(
//     <>
//       <button onClick={() => setIsPlaying(!isPlaying)}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//       <VideoPlayer
//       isPlaying={isPlaying}
//       src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
//     />
//     </>
//   );
// }

// -------------------------------------------------------------------------------

// < 3-4. You Might Not Need An Effect : Effect가 필요하지 않을 수도 있습니다 >
/*
  외부 시스템이 관여하지 않는 경우(예: 일부 prop이나 state가 변경될 때 컴포넌트의 state를 업데이트하려는 경우)에는 Effect가 필요하지 않는 경우가 있다.
  불필요한 Effect를 제거하면 코드를 더 쉽게 따라갈 수 있고, 실행 속도가 빨라지며, 오류 발생 가능성이 줄어들게 된다.

  Effect가 불필요한 경우는 일반적으로 2가지가 있다.
  1. 렌더링을 위해 데이터를 변환할 때
  2. 사용자 이벤트를 처리할 때
*/

// 예를 들어 다른 state에 따라 일부 state를 조정할 때는 Effect가 불필요하다.

// 예제1.

// 불필요한 Effect
// function Form() {
//   const [firstName, setFirstName] = useState('Taylor');
//   const [lastName, setLastName] = useState('Swift');

//   // 🔴 Avoid: redundant state and unnecessary Effect
//   const [fullName, setFullName] = useState('');
//   useEffect(() => {
//     setFullName(firstName + ' ' + lastName);
//   }, [firstName, lastName]);
//   // ...
// }

// Effect를 사용하지 않은 로직
// function Form() {
//   const [firstName, setFirstName] = useState('Taylor');
//   const [lastName, setLastName] = useState('Swift');
//   // ✅ Good: calculated during rendering
//   const fullName = firstName + ' ' + lastName;
//   // ...
// }

/*
  기존 props나 state에서 계산할 수 있는 것이 있으면 state에 넣지 않은 것이 좋다! 
  대신 렌더링 중에 계산해야 한다. 
  
  이렇게 하면 코드가 더 빨라지고(추가적인 “계단식” 업데이트를 피함), 더 간단해지고(일부 코드 제거), 오류가 덜 발생한다.(서로 다른 state 변수가 서로 동기화되지 않아 발생하는 버그를 피함).
*/

// 예제2.

// 불필요한 Effect
// function TodoList({ todos, filter }){
//   const [newTodo, setNewTodo] = useState('');

//   // 🔴 이러지 마세요: 중복 state 및 불필요한 Effect
//   const [visibleTodos, setVisibleTodos] = useState([]);
//   useEffect(() => {
//     setVisibleTodos(getFilteredTodos(todos, filter));
//   }, [todos, filter]);

//   // ...
// }

// Effect를 사용하지 않은 로직
// function TodoList(){
//   const [newTodo, setNewTodo] = useState('');

//   // ✅ getFilteredTodos()가 느리지 않다면 괜찮다.
//   const visibleTodos = getFilteredTodos(todos, filter);
// }

/*
  일반적으로는 위 코드가 합리적이지만 getFilteredTodos()가 느리거나 todos가 많을 경우, newTodo와 같이 관련 없는 state 변수가 변경되더라도 getFilteredTodos()를 다시 계산하고 싶지 않을 수 있다.
  이때는 useMemo 훅을 함께 사용할 수 있다.
*/
// function TodoList({ todos, filter }) {
//   const [newTodo, setNewTodo] = useState('');
//   const visibleTodos = useMemo(() => {
//     // ✅ todos나 filter가 변하지 않는 한 재실행되지 않음
//     return getFilteredTodos(todos, filter);
//   }, [todos, filter]);
//   // ...
// }

// 또는 한 줄로 작성할 수 있다.
// function TodoList({ todos, filter }) {
//   const [newTodo, setNewTodo] = useState('');
//   // ✅ todos나 filter가 변하지 않는 한 getFilteredTodos()가 재실행되지 않음
//   const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
//   // ...
// }

// < 3-4-1. Resetting all state when a prop changes : prop이 변경되면 모든 state 재설정하기 >

export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 Avoid: Resetting state on prop change in an Effect
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}

export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ key가 변하면 이 컴포넌트 및 모든 자식 컴포넌트의 state가 자동으로 재설정됨
  const [comment, setComment] = useState('');
  // ...
}