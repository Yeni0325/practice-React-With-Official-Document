import { useState } from "react"
import "./App.css";

// << 2️⃣ Managing State : state 관리 >>

// -------------------------------------------------------------------------------

// < 2-1. Reacting to input with state : state로 입력에 반응하기 >
/*
  * Promise : Promise는 비동기 함수를 다루기 위한 목적으로 만들어진 객체로 일반 객체와 다르게 상태 정보를 갖음!

  * async & await : 가장 최근에 나온 비동기 처리 패턴
    - 함수 앞에 async를 붙이면 해당 함수는 자동으로 프로미스를 반환
    - 비동기로 처리되는 부분에 await를 붙이면 해당 프로미스가 끝날 때 까지 기다림(동기적으로 처리)
    - await은 async가 붙은 함수 안에서만 사용 가능!

  * async & await에서 발생하는 에러는 try & catch 구문으로 구현 가능!
*/
// export default function Form(){
//   const [answer, setAnswer] = useState('');
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState('typing'); // 'typing', 'submitting', 'success'
  
//   if(status === 'success'){
//     return <h1>That's right!</h1>
//   }

//   async function handleSubmit(e){
//     e.preventDefault();
//     setStatus('submitting');
//     try{
//       await submitForm(answer);
//       setStatus('success');
//     } catch (err) {
//       setStatus('typing');
//       setError(err);
//     }
//   }

//   function handleTextareaChange(e){
//     setAnswer(e.target.value);
//   }

//   function submitForm(answer){  
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         let shouldError = answer.toLowerCase() !== 'lima'
//         if(shouldError){
//           reject(new Error('Good guess but a wrong number. Try again!'));
//         } else {
//           resolve();
//         }
//       }, 1500);
//     });
//   }
  
//   return(
//     <>
//       <h2>City Quiz</h2>
//       <p>
//         In which city is there a billboard that turns air into drinkable water?
//       </p>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={answer}
//           onChange={handleTextareaChange}
//           disabled={status === 'submitting'}
//         />
//         <br />
//         <button disabled={answer.length === 0 || status === 'submitting'}>
//           Submit
//         </button>
//         {error !== null &&
//           <p className="Error">
//             {error.message}
//           </p>
//         }
//       </form>
//     </>
//   );
// }

// -------------------------------------------------------------------------------

// < 2-2. Choosing the state structure : state 구조 선택 >
/*
  state에 불필요하거나 중복된 정보를 포함하지 않아야 한다. 쓸데없는 state가 있으면 업데이트하는 것을 잊어버려 버그를 유발하기 쉽다!

  * state 구조화 원칙
    1. 관련 state를 그룹화하기 
      : 항상 두개 이상의 state 변수를 동시에 업데이트 하는 경우, 단일 state 변수로 병합하는 것이 좋다.
    2.  state가 서로 모순되지 않기
     : 여러 state 조각이 서로 모순되거나 불일치 할 수 있는 방식으로 state를 구성하면 실수가 발생할 여지가 생긴다.
    3. 불필요한 state 피하기
      : 렌더링 중에 컴포넌트의 props나 기존 state 변수에서 일부 정보를 계산할 수 있는지 파악한다.
    4. state 중복을 피하기
      : 동일한 데이터가 여러 state 변수 간에 중복되면 state를 유지하기 어렵다.
    5. 깊게 중첩된 state는 피하기
      : 깊게 계층화된 state는 업데이트하기 쉽지 않다. 가능하면 평평하게 구현하는 것이 좋다.

  state를 최대한 단순하게 만들되, 그보다 더 단순해서는 안 된다!
*/
// export default function Form(){
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   // const [fullName, setFullName]= useState(''); // 불필요한 state 피하기
//   const fullName = firstName + ' ' + lastName;

//   const handleFirstNameChange = (e) => {
//     setFirstName(e.target.value);
//   }

//   const handleLastNameChange = (e) => {
//     setLastName(e.target.value);
//   }

//   return(
//     <>
//       <h2>Let's check you in</h2>
//       <label>
//         First Name : {' '}
//         <input 
//           value={firstName}
//           onChange={handleFirstNameChange}
//         />
//       </label>
//       <label>
//         Last Name : {' '}
//         <input
//           value={lastName}
//           onChange={handleLastNameChange}
//         />
//       </label>
//       <p>
//         Your ticket will be issued to : <b>{fullName}</b>
//       </p>
//     </>
//   );
// }

// -------------------------------------------------------------------------------

// < 2-3. Sharing state between components : 컴포넌트 간의 state 공유 >
/*
  때로는 두 컴포넌트의 state가 항상 함께 변경되기를 원할 때가 있다. 
  이렇게 하려면 두 컴포넌트에서 state를 제거하고 가장 가까운 공통 부모로 이동한 다음 프로퍼티를 통해 전달하면 된다. 
  이를 “state 올리기”라고 하며, React 코드를 작성할 때 가장 흔히 하는 작업 중 하나다.

  아래 예제에서는 한 번에 하나의 패널만 활성화된다.
*/
// export default function Accordion(){
//   const [activeIndex, setActiceIndex] = useState(0);
//   return(
//     <>
//       <h2>Almaty, Kazakhstan</h2>
//       <Panel
//         title = "About"
//         isActive = {activeIndex === 0}
//         onShow = {() => setActiceIndex(0)}
//       >
//         With a population of about 2 million, Almaty is kazahstan's largest city. From 1929 to 1997, it was its capital city.
//       </Panel>
//       <Panel
//         title = "Etymology"
//         isActive = {activeIndex === 1}
//         onShow = {() => setActiceIndex(1)}
//       >
//         The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
//       </Panel>
//     </>/   );
// }

// function Panel({title, children, isActive, onShow}){
//   return(
//     <section className="panel">
//       <h3>{title}</h3>
//       {isActive ? (<p>{children}</p>) : (<button onClick={onShow}>show</button>)}
//     </section>
//   );
// }

// -------------------------------------------------------------------------------
// import ContactList from "./ContactList.jsx";
// import Chat from "./Chat.jsx";

// < 2-4. Preserving and resetting state : state 보존 및 재설정  >
/*
  기본적으로 React는 이전에 렌더링된 컴포넌트 트리와 “일치”하는 트리의 부분을 보존한다.

  React를 사용하면 기본 동작을 재정의하고 컴포넌트에 다른 key를 전달하여 state를 강제로 초기화할 수 있다.

  * 리렌더링 사이에 state를 유지하려면 트리의 구조가 “일치”해야 합니다. 구조가 다르면 React는 트리에서 컴포넌트를 제거할 때 state를 파괴한다.

  전환할 때 state를 재설정하는 방법에는 두 가지가 있다.
    1. 컴포넌트를 다른 위치에 렌더링하기
      {isPlayerA && 
        <Counter person="Taylor" />
      }
      {!isPlayerA && 
        <Counter person="Sarah" />
      }
    2. 각 컴포넌트에 key로 명시적인 아이덴티티 부여하기
*/
// export default function Messenger() {
//   const [to, setTo] = useState(contacts[0]);
//   return (
//     <div>
//       <ContactList
//         contacts={contacts}
//         selectedContact={to}
//         onSelect={contact => setTo(contact)}
//       />
//       <Chat key={to.id} contact={to} />
//     </div>
//   )
// }

// const contacts = [
//   { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
//   { id: 1, name: 'Alice', email: 'alice@mail.com' },
//   { id: 2, name: 'Bob', email: 'bob@mail.com' }
// ];

// -------------------------------------------------------------------------------
import { useReducer } from "react"; 
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import tasksReducer from "./taskReducer";

// < 2-4. Extracting state logic into a reducer : state 로직을 reducer로 추출하기   >
/*
  컴포넌트가 커질수록 여기저기 흩어져 있는 state 로직의 양도 늘어난다.
  복잡성을 줄이고 모든 로직을 접근하기 쉽게 한 곳에 모으려면, state 로직을 컴포넌트 외부의 reducer라고 하는 단일 함수로 옮길 수 있다.

  * Reducer는 state를 관리하는 다른 방법이다.
  useState에서 useReducer로 마이그레이션하는 방법은 세 단계로 진행된다.
    1. state를 설정하는 것에서 action들을 전달하는 것으로 변경하기
    2. reducer 함수 작성하기
    3. 컴포넌트에서 reducer 사용하기

  * reducer 형태 *
  const [state, dispatch] = useReducer(reducer, initalState, init);
    1. state : 컴포넌트에서 사용할 state
    2. dispatch 
      - 첫번째 인자인 reducer 함수를 실행시킨다.
      - 컴포넌트 내에서 state의 업데이트를 하기 위해 사용하는 함수
    3. reducer 함수
      - 컴포넌트 외부에서 state를 업데이트 하는 함수
      - 현재 state, action 객체를 인자로 받아, 기존의 state를 대체하여 새로운 state를 반환하는 함수
    4. initalState
      - 초기 state
    5. init
      - 초기 함수 (초기 state를 조금 지연해서 생성하기 위해 사용)

  dispatch 함수에 넣어준 객체를 “action” 이라고 한다.
  
  * reducer 안에서는 switch 구문을 사용하는 게 일반적이다.

  * useReducer Hook은 useState와 비슷하다. 
  초기 state 값을 전달해야 하며, 그 결과로 state 값과 state 설정자 함수(useReducer의 경우 dispatch 함수)를 반환한다. 하지만 조금 다른 점이 있다.

  * useReducer Hook은 두 개의 인자를 받는다.
    1. reducer 함수
    2. 초기 state
  
  * useReducer는 아래 내용을 반환한다.
    1. state값
    2. dispatch 함수 (사용자의 action을 reducer에 “전달”해주는 함수)

  * useState와 useReducer 비교
  1. 코드 크기 
    : 일반적으로 useState를 사용하면 미리 작성해야 하는 코드가 줄어든다. useReducer를 사용하면 reducer 함수 와 action을 전달하는 부분 모두 작성해야 한다. 
      하지만 많은 이벤트 핸들러가 비슷한 방식으로 state를 업데이트하는 경우 useReducer를 사용하면 코드를 줄이는 데 도움이 될 수 있다.
  2. 가독성
    : useState로 간단한 state를 업데이트 하는 경우 가독성이 좋다. 그렇지만 state의 구조가 더욱 복잡해지면, 컴포넌트의 코드의 양이 부풀어 오르고 한눈에 읽기 어려워질 수 있다. 
      이 경우 useReducer를 사용하면 업데이트 로직이 어떻게 동작 하는지와 이벤트 핸들러를 통해 무엇이 일어났는지 를 깔끔하게 분리할 수 있다.
  3. 디버깅
    :  reducer는 컴포넌트에 의존하지 않는 순수한 함수입니다. 즉, 별도로 분리해서 내보내거나 테스트할 수 있다.

  * reducer 잘 사용하기
  : reducer는 반드시 순수해야한다. 즉, 입력 값이 같다면 결과 값도 항상 같아야 한다.
  
  Immer를 사용하여 간결한 reducer 작성할 수 있다.
*/
export default function TaskApp(){
  const [tasks, dispatch] = useReducer(
    tasksReducer ,
    initialTasks
  );

  function handleAddTask(text){
    dispatch({
      type : 'added' ,
      id : nextId++ ,
      text : text ,
    });
  }

  function handleChangeTask(task){
    dispatch({
      type : 'changed' ,
      task : task ,
    });
  }

  function handleDeleteTask(taskId){
    dispatch({
      type : 'deleted' ,
      id : taskId ,
    });
  }

  return(
    <>
      <h1>Prague itinerary</h1>
      <AddTask 
        onAddTask={handleAddTask}
      />
      <TaskList 
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];

