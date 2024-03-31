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
export default function Form(){
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing'); // 'typing', 'submitting', 'success'
  
  if(status === 'success'){
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e){
    e.preventDefault();
    setStatus('submitting');
    try{
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e){
    setAnswer(e.target.value);
  }

  function submitForm(answer){  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError = answer.toLowerCase() !== 'lima'
        if(shouldError){
          reject(new Error('Good guess but a wrong number. Try again!'));
        } else {
          resolve();
        }
      }, 1500);
    });
  }
  
  return(
    <>
      <h2>City Quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={answer.length === 0 || status === 'submitting'}>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}