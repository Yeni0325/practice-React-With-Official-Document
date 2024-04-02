import { useState } from "react"
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

export default function App(){
  const [count, setCount] = useState(0);
  const increaseCountState = () => {
    setCount(current => current + 1);
  }

  return(
    <div>
      <p>State : {count}</p>
      <button onClick={increaseCountState}>State 올려</button>
    </div>
  );
}