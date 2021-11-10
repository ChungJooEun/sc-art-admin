import React, { useState, useEffect } from "react";

import Paging from "../../basic-components/Paging";

const dataEventList = [
  {
    id: 1,
    name: "행사이름 1",
    event_type_name: "전시",
    address: "주소 1",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 2,
    name: "행사이름 2",
    event_type_name: "공연",
    address: "주소 2",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 3,
    name: "행사이름 3",
    event_type_name: "기타",
    address: "주소 3",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 4,
    name: "행사이름 4",
    event_type_name: "전시",
    address: "주소 4",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 5,
    name: "행사이름 5",
    event_type_name: "기타",
    address: "주소 5",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "대기중", // 누락
  },
  {
    id: 6,
    name: "행사이름 6",
    event_type_name: "전시",
    address: "주소 6",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자6", // 누락
    state: "대기중", // 누락
  },
  {
    id: 7,
    name: "행사이름 7",
    event_type_name: "공연",
    address: "주소 7",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 8,
    name: "행사이름 8",
    event_type_name: "기타",
    address: "주소 8",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자8", // 누락
    state: "대기중", // 누락
  },
  {
    id: 9,
    name: "행사이름 9",
    event_type_name: "전시",
    address: "주소 9",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자9", // 누락
    state: "대기중", // 누락
  },
  {
    id: 10,
    name: "행사이름 10",
    event_type_name: "기타",
    address: "주소 10",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "대기중", // 누락
  },
];
const dataPlaceList = [
  {
    id: 1,
    name: "공간이름 1",
    space_type_name: "공연장",
    address: "주소 1",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 2,
    name: "공간이름 2",
    space_type_name: "연습실",
    address: "주소 2",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "기각", // 누락
  },
  {
    id: 3,
    name: "공간이름 3",
    space_type_name: "연습실",
    address: "주소 3",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "기각", // 누락
  },
  {
    id: 4,
    name: "공간이름 4",
    space_type_name: "악기상점",
    address: "주소 4",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "게시", // 누락
  },
  {
    id: 5,
    name: "공간이름 5",
    space_type_name: "갤러리",
    address: "주소 4",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "기각", // 누락
  },
  {
    id: 6,
    name: "공간이름 6",
    space_type_name: "공연장",
    address: "주소 6",
    create_date: "2021-11-08",
    writer: "관리자", // 누락
    state: "대기중", // 누락
  },
  {
    id: 7,
    name: "공간이름 7",
    space_type_name: "연습실",
    address: "주소 7",
    create_date: "2021-11-08",
    writer: "관리자7", // 누락
    state: "기각", // 누락
  },
  {
    id: 8,
    name: "공간이름 8",
    space_type_name: "연습실",
    address: "주소 8",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "기각", // 누락
  },
  {
    id: 9,
    name: "공간이름 9",
    space_type_name: "악기상점",
    address: "주소 4",
    create_date: "2021-11-08",
    writer: "관리자9", // 누락
    state: "게시", // 누락
  },
  {
    id: 10,
    name: "공간이름 10",
    space_type_name: "갤러리",
    address: "주소 10",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "기각", // 누락
  },
];

const count = 10;

const SelectListModal = ({ CheckableListComponent, closeModal }) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const getEventList = () => {
    setList(dataEventList);
    setLoading(false);
  };

  const getPlaceList = () => {
    setList(dataPlaceList);
    setLoading(false);
  };

  useEffect(() => {
    // url 파싱
    if (window.location.href.includes("event")) {
      getEventList();
    } else {
      getPlaceList();
    }
  });

  if (loading) {
    return <p>loading...</p>;
  }

  if (!list) {
    return <p>fail to get data</p>;
  }

  return (
    <div className="modal" style={{ display: "block", background: "#fff" }}>
      <div
        className="modal_content"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <button
          className="modal-btn"
          id="modal-btn"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            border: "1px solid #313131",
          }}
          onClick={() => closeModal()}
        >
          X
        </button>
        <div
          className="modal-title"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <h3 style={{ marginRight: "200px" }}>총 140건 / 선택6건</h3>
          <div className="modal-serch-bar" style={{ marginRight: "40px" }}>
            <span>행사명</span>
            <input type="text" />
            <button className="btn-wraning">검색</button>
          </div>
        </div>

        <CheckableListComponent
          list={list}
          pageNumber={pageNumber}
          count={count}
          isModal={true}
        />
        <Paging />
        <div className="btn-wrap" style={{ textAlign: "center" }}>
          <a>
            <button className="btn btn-primary">가져오기</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SelectListModal;
