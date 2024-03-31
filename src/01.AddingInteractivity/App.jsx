/*
 * && 표현식은 왼쪽 조건이 true면 오른쪽 값을 반환
 * 작성하는 React 컴포넌트는 동일한 입력이 주어졌을 때 항상 동일한 JSX를 반환해야함
 *
 * 사이드 이펙트 : 함수 내의 구현 내용이 함수 외부에 영향을 끼치는 경우, 해당 함수는 side effect가 있음
 *
 * state : 시간이 지남에 따라 변하는 데이터
 *
 * 이벤트 핸들러 함수이름은 일반적으로 'handle'로 시작함!
 * 관례상 이벤트 핸들러 props은 on으로 시작하고 그 뒤에 대문자가 와야함!
 */

// << 1️⃣ Adding Interactivity : 상호작용 추가하기 >>

// -------------------------------------------------------------------------------

// < 1-1.A Component's Memoory : 컴포넌트의 메모리 >

/*
  - 컴포넌트가 렌더링 사이에 일부 정보를 기억해야할 때 state를 사용
*/
// import { useState } from 'react';
// import './App.css';
// import { sculptureList } from './01.AddingInteractivity/data';

// export default function Gallery(){
//   const [index, setIndex] = useState(0);
//   const [showMore, setShowMore] = useState(false);

//   const hasPrev = index > 0;
//   const hasNext = index < sculptureList.length - 1 ;

//   console.log("hasPrev : ", hasPrev);
//   console.log("hasNext : ", hasNext);

//   const handlePrevClick = () => {
//     if(hasPrev) {
//       setIndex(current => current - 1);
//     }
//   }

//   const handleNextClick = () => {
//     if(hasNext){
//       setIndex(current => current + 1);
//     } else {
//       setIndex(0);
//     }
//   }

//   function handleMoreClick(){
//     setShowMore(!showMore);
//   }

//   let sculpture = sculptureList[index];

//   return(
//     <>
//       <button onClick={handlePrevClick} disabled={!hasPrev}>
//         Previous
//       </button>
//       <button onClick={handleNextClick} disabled={!hasNext}>
//         Next
//       </button>
//       <h2>
//         <i>{sculpture.name}</i>
//         by {sculpture.artist}
//       </h2>
//       <h3>
//         ({index + 1} of {sculptureList.length})
//       </h3>
//       <button onClick={handleMoreClick}>
//         {showMore ? 'Hide' : 'Show'} details
//       </button>
//       {showMore && <p>{sculpture.description}</p>}
//       <img
//         src={sculpture.url}
//         alt={sculpture.alt}
//       />
//     </>
//   );
// }

// -------------------------------------------------------------------------------

// < 1-2. Render and Commit : 렌더링하고 커밋하기 >

/*
  렌더링 시 React는 변경된 부분만 재렌더링 한다!
*/

// export default function Gallery(){
//   return(
//     <section>
//       <h1>Inspiring Sculptures</h1>
//       <Image />
//       <Image />
//       <Image />
//     </section>
//   );
// }

// function Image(){
//   return(
//     <img 
//       src="https://i.imgur.com/ZF6s192.jpg"
//       alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
//     />
//   );
// }

// -------------------------------------------------------------------------------

// import { useState } from "react";

// < 1-3. State as a Snapshot : 스냅샷으로서의 state >
/*
  렌더링이란 ?
  : React가 컴포넌트, 즉 함수를 호출한다는 뜻!
  : prop, 이벤트 핸들러, 로컬 변수 등 모두 렌더링 당시의 state를 사용해 계산됨.

  - state는 함수가 반환된 후 사라지는 일반 변수와 다르다.
  - React에서 setState나 useState의 업데이트 함수를 호출했을 때, 상태 변경은 비동기적으로 이루어진다.
    => 즉, setState 함수를 호출한 직후 state가 바로 반영되지 않고 컴포넌트가 재렌더링되는 시점에 반영된다!
*/
// export default function Form() {
//   const [to, setTo] = useState('Alice');
//   const [message, setMessage] = useState('Hello');

//   function handleSubmit(e) {
//     e.preventDefault();
//     setTimeout(() => {
//       alert(`You said ${message} to ${to}`);
//     }, 5000);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         To:{' '}
//         <select
//           value={to}
//           onChange={e => setTo(e.target.value)}>
//           <option value="Alice">Alice</option>
//           <option value="Bob">Bob</option>
//         </select>
//       </label>
//       <textarea
//         placeholder="Message"
//         value={message}
//         onChange={e => setMessage(e.target.value)}
//       />
//       <button type="submit">Send</button>
//     </form>
//   );
// }

// -------------------------------------------------------------------------------
// import { useState } from "react"
// < 1-4. Queueing a Series of State Updates : 여러 state 업데이트를 큐에 담기 >
/*
  React는 state를 업데이트 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때 까지 기다림!

  * 업데이트 함수 : setScore(current => current + 1)
    - React는 이벤트 핸들러의 모든 코드가 모두 실행된 후에 이 함수가 처리되도록 큐에 넣음
    - 다음 렌더링 중에 React는 큐를 순회하여 최종 업데이트 된 state를 제공!
    - 업데이트 함수의 명명규칙
      1. 해당 state 변수의 첫 글자 ex) setEnabled(e => !e) / setLastName(ln => ln.reverse())
      2. 자세한 코드               ex) setEnabled(enabled => !enabled)
      3. 접두사 사용               ex) setEnabled(prevEnabled => !prevEnabled)


  * <button onClick={() => {
    setNumber(number + 5);
    setNumber(n => n + 1);
  }}>Increase the number</button>
  - 1. setNumber(number + 5) : number는 0이므로 setNumber(0 + 5) => React는 큐에 5로 바꾸기를 추가함
  - 2. setNumber(n => n + 1) : n => n + 1 은 업데이트 함수       => React는 해당 함수를 큐에 추가함

  * <button onClick={() => {
    setNumber(number + 5);
    setNumber(n => n + 1);
    setNumber(42);
  }}>Increase the number</button>
  - 1. setNumber(number + 5) : number는 0이므로 setNumber(0 + 5) => React는 큐에 5로 바꾸기를 추가함
  - 2. setNumber(n => n + 1) : n => n + 1 은 업데이트 함수       => React는 해당 함수를 큐에 추가함
  - 3. setNumber(42);                                            => React는 42로 바꾸기를 큐에 추가함


  정리하자면, 이벤트 핸들러가 완료되면 React는 리렌더링을 실행. 리렌더링을 하는 동안 React는 큐를 처리한다!
*/
// export default function Counter(){
//   const [score, setScore] = useState(0);

//   // const increment = () => setScore(current => current + 1);
//   function increment() {
//     setScore(s => s + 1);
//   }
//   return(
//     <>
//       <h1>{number}</h1>
//       <button onClick={() => {
//         setNumber(number + 5);
//         setNumber(n => n + 1);
//       }}>Increase the number</button>
//     </>
//   );
// }

// -------------------------------------------------------------------------------

// < 1-5. Updating Objects in State : 객체 state 업데이트 > 
/*
  state는 객체를 포함한 모든 종류의 JS 값을 보유할 수 있다. 그러나 state에 있는 객체와 배열을 직접 변경해서는 안된다.
  =>> 대신 객체와 배열을 업데이트하려면 새 객체를 생성하거나 기존 객체의 복사본을 만든 다음 해당 복사본을 사용하도록 state를 업데이트 해야한다!!

  * ... 전개 구문은 “얕은” 구문으로, 한 단계 깊이만 복사한다.
  setPerson({
    ...person,                // 이전 필드를 복사
    firstName: e.target.value // 단, first name만 덮어씌움
  });

  * state 가 깊게 중첩된 경우 Immer를 사용할 수 있음!

*/
// import { useState } from "react";

// export default function Form() {
// const [person, setPerson] = useState({
//   name: 'Niki de Saint Phalle',
//   artwork: {
//     title: 'Blue Nana',
//     city: 'Hamburg',
//     image: 'https://i.imgur.com/Sd1AgUOm.jpg',
//   }
// });

//   function handleChange(e) {
//     console.log(e);
//     console.log(e.target.name);
//     console.log(e.target.value);
//     setPerson({
//       ...person,
//       [e.target.name]: e.target.value
//     });
//     console.log(person);
//   }

//   return (
//     <>
//       <label>
//         First name:
//         <input
//           name="firstName"
//           value={person.firstName}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Last name:
//         <input
//           name="lastName"
//           value={person.lastName}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           name="email"
//           value={person.email}
//           onChange={handleChange}
//         />
//       </label>
//       <p>
//         {person.firstName}{' '}
//         {person.lastName}{' '}
//         ({person.email})
//       </p>
//     </>
//   );
// }

// -------------------------------------------------------------------------------

// < 1-6. Updating arrays in state : 배열 state 업데이트 > 
/*
  * 객체와 마찬가지로 state에 저장된 배열을 업데이트하려면 새 배열을 생성하거나 기존 배열의 복사본을 만든 다음 새 배열을 사용해야한다!

  * 객체와 마찬가지로 배열 복사가 지루하다면 Immer 라이브러리 사용이 가능하다!

  * 배열 전개 구문 [...arr, newItem]을 사용하여 새 항목으로 배열을 만들 수 있다.

  * filter() 및 map()을 사용하여 필터링되거나 변형된 항목으로 새 배열을 만들 수 있다.
*/
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, setList] = useState(
    initialList // [{}, {}, {}]
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}