import React from "react";

const Curation = () => {
  return (
    <div className="page-section">
      <div className="form-group">
        <label className="form-label" for="select01">
          종류
        </label>
        <select id="custom-select" className="form-control custom-select">
          <option>전시</option>
          <option>공연</option>
          <option>기타</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" for="select02">
          분야
        </label>
        <select
          id="select02"
          data-toggle="select"
          multiple
          className="form-control"
        >
          <option>뮤지컬/오페라</option>
          <option>음악/콘서트</option>
          <option>연극</option>
          <option>아동극</option>
          <option>무용</option>
          <option>기타</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" for="select03">
          테마
        </label>
        <select
          id="select03"
          data-toggle="select"
          multiple
          className="form-control"
        >
          <option>내한</option>
          <option>클래식</option>
          <option>전통예술</option>
          <option>인디</option>
          <option>재즈</option>
          <option>K-pop</option>
          <option>Rock</option>
          <option>발라드</option>
          <option>댄스</option>
          <option>R&B</option>
          <option>힙합</option>
          <option>봄</option>
          <option>여름</option>
          <option>가을</option>
          <option>겨울</option>
          <option>성탄절</option>
          <option>명절</option>
          <option>기념일</option>
          <option>흐림/비</option>
          <option>화창함</option>
          <option>재미있는</option>
          <option>이색적인</option>
          <option>학습을 돕는</option>
          <option>감동적인</option>
          <option>일행</option>
          <option>나홀로</option>
          <option>친구</option>
          <option>커플</option>
          <option>아이랑</option>
          <option>부모랑</option>
          <option>가족</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" for="select04">
          서초구 축제
        </label>
        <select id="custom-select" className="form-control custom-select">
          <option>축제1</option>
          <option>축제2</option>
          <option>축제3</option>
        </select>
      </div>
    </div>
  );
};

export default Curation;
