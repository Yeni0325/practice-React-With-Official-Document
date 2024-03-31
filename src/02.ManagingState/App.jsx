import { useState } from "react"
import "../index.css";

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
export default function Form(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [fullName, setFullName]= useState(''); // 불필요한 state 피하기
  const fullName = firstName + ' ' + lastName;

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  return(
    <>
      <h2>Let's check you in</h2>
      <label>
        First Name : {' '}
        <input 
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last Name : {' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to : <b>{fullName}</b>
      </p>
    </>
  );
}
