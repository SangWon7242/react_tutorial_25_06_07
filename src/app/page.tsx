// 리액트 함수 이름의 첫 문자는 대문자이다.

// 컴포넌트 생성
// 컴포넌트를 엘리먼트로 사용하는 것이 가능
const Hello = () => {
  return <div>안녕하세요.</div>;
};

const Namaste = () => {
  return <div>나마쓰떼</div>;
};

export default function App() {
  return (
    <div>
      <Hello />
      <Hello />
      <Namaste />
    </div>
  );
}
