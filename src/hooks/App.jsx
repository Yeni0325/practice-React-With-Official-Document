import { useState, useRef, useEffect, useMemo } from "react"

// << useMemo >>

// 예제 1.
// const hardCalculate = (number) => {
//   console.log('어려운 계산!');
//   for(let i=0; i< 99999999; i++){};  // 생각하는 시간
//   return number + 10000;
// }

// const easyCalculate = (number) => {
//   console.log('짱 쉬운 계산!');
//   return number + 1;  
// }

// export default function App(){
//   const [hardNumber, setHardNumber] = useState(1);
//   const [easyNumber, setEasyNumber] = useState(1);

//   // const hardSum = hardCalculate(hardNumber);
//   const hardSum = useMemo(() => {
//     return hardCalculate(hardNumber);
//   }, [hardNumber]); // hardNumber가 변경됐을 때만 hardCalculate(hardNumber) 실행
//   const easySum = easyCalculate(easyNumber);

//   return(
//     <div>
//       <h3>어려운 계산기</h3>
//       <input 
//         type="number"
//         value={hardNumber}
//         onChange={e => setHardNumber(parseInt(e.target.value))}
//       />
//       <span> + 10000 = {hardSum}</span>

//       <h3>쉬운 계산기</h3>
//       <input 
//         type="number"
//         value={easyNumber}
//         onChange={e => setEasyNumber(parseInt(e.target.value))}
//       />
//       <span> + 1 = {easySum}</span>
//     </div>
//   );
// }

// 예제2
export default function App(){
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  // const location = isKorea ? '한국' : '외국';
  // const location = {
  //   country : isKorea ? '한국' : '외국'
  // }
  const location = useMemo(() => {
    return {
         country : isKorea ? '한국' : '외국' ,
    }
  }, [isKorea]);


  useEffect(() => {
    console.log("useEffect 호출");
  }, [location]);

  return(
    <div>
      <h2>하루에 몇끼 먹어요?</h2>
      <input 
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <hr />
      <h2>어느 나라에 있어요?</h2>
      <p>나라 : {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
}