import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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

export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('Submitting!');
      }}
    >
      <input />
      <button>Send</button>
    </form>
  );
}
