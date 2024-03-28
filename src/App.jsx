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

// * 1️⃣ Adding Interactivity *
import { useState } from 'react';
import './App.css';
import { sculptureList } from './01.AddingInteractivity/data';

export default function Gallery(){
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1 ;

  const handleNextClick = () => {
    if(hasNext){
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick(){
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];

  return(
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name}</i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}
