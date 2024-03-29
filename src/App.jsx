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

// << 1️⃣ Adding Interactivity >>

// -------------------------------------------------------------------------------

// < 1-1.A Component's Memoory >

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

// < 1-2. Render and Commit >

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

import { useState } from "react";

// < 1-3. State as a Snapshot >
/*
  렌더링이란 ?
  : React가 컴포넌트, 즉 함수를 호출한다는 뜻!
  : prop, 이벤트 핸들러, 로컬 변수 등 모두 렌더링 당시의 state를 사용해 계산됨.

  - state는 함수가 반환된 후 사라지는 일반 변수와 다르다.
  - React에서 setState나 useState의 업데이트 함수를 호출했을 때, 상태 변경은 비동기적으로 이루어진다.
    => 즉, setState 함수를 호출한 직후 state가 바로 반영되지 않고 컴포넌트가 재렌더링되는 시점에 반영된다!

*/
export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}