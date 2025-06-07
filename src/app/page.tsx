"use client";

import styled from "styled-components";

// HTML 요소에 스타일 적용
const StyledDiv = styled.div`
  width: 200px;
  height: 200px;
  background-color: navy;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Square = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      정사각형
    </div>
  );
};

const Square2 = () => {
  const style = {
    width: "200px",
    height: "200px",
    backgroundColor: "gold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return <div style={style}>정사각형</div>;
};

const Square3 = () => {
  return (
    <div className="w-[200px] h-[200px] bg-green-500 flex items-center justify-center">
      정사각형
    </div>
  );
};

export default function App() {
  return (
    <>
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        정사각형
      </div>
      <Square />
      <Square2 />
      <Square3 />
      <StyledDiv>정사각형</StyledDiv>
    </>
  );
}
