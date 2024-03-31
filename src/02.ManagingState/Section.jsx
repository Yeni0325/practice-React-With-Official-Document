import { useContext } from 'react';
import { LevelContext } from '../02.ManagingState/LevelContext.jsx';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  console.log("level : ", level);
  return (
    <section className="section">
      {/* 이 <Section> 안에 있는 컴포넌트가 LevelContext를 요청하면 이 level을 제공하라. */}
      <LevelContext.Provider value={level + 1}> 
        {children}
      </LevelContext.Provider>
    </section>
  );
}