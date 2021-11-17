import React, { useEffect, useState } from "react";
import axios from "axios";

import CheckableEventList from "../event-components/CheckableEventList";
import Paging from "../../basic-components/Paging";

const count = 10;

const ScModal = ({ closeModal, getEventList }) => {
  const onClickCloseBtn = () => {
    closeModal();
  };

  const [eventList, setEventList] = useState(null);
  const [totalNum, setTotalNum] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const getPageNumber = (curNumber) => {
    setPageNumber(curNumber);
  };

  const [loading, setLoading] = useState(true);

  const [checkedList, setCheckedList] = useState([]);
  const addCheckedList = (eventInfo) => {
    setCheckedList(checkedList.concat(eventInfo));
  };

  const removeNoneCheckedList = (rId) => {
    let ary = checkedList;
    ary = ary.filter((item) => item.id !== rId);

    setCheckedList(ary);
  };

  const onClickGetBtn = () => {
    getEventList(checkedList);
    closeModal();
  };

  useEffect(() => {
    const getEventList = async () => {
      const url = "http://118.67.154.118:3000/api/admin/cultural-event/list";
      // const url = "/api/admin/cultural-event/list";

      try {
        const response = await axios.get(url, {
          params: {
            sort_type: "desc",
            sort_column: "create_date",
            page: pageNumber,
            count: count,
            from_date: "20200101",
            to_date: "20302110",
          },
        });

        if (response.status === 200) {
          setEventList(response.data.list);
          setLoading(false);
          setTotalNum(response.data.total_count);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getEventList();
  }, [pageNumber]);

  if (loading) {
    return <p>loading..</p>;
  }

  if (!eventList || !totalNum) {
    return <></>;
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
          onClick={() => onClickCloseBtn()}
        >
          X
        </button>
        <div
          className="modal-title"
          style={{ display: "flex", justifyContent: "spaceAround" }}
        >
          <h3 style={{ marginRight: "200px" }}>
            총 {totalNum}건 / 선택 {checkedList.length}건
          </h3>
          <div className="modal-serch-bar" style={{ marginRight: "40px" }}>
            <span>행사명</span>
            <input type="text" />
            <button className="btn-wraning">검색</button>
          </div>
        </div>
        <CheckableEventList
          list={eventList}
          pageNumber={pageNumber}
          count={count}
          addCheckedList={addCheckedList}
          removeNoneCheckedList={removeNoneCheckedList}
        />
        <Paging
          pageNumber={pageNumber}
          getPageNumber={getPageNumber}
          totalNum={totalNum}
          count={10}
        />
        <br />
        <div className="btn-wrap" style={{ textAlign: "center" }}>
          <button className="btn btn-primary" onClick={() => onClickGetBtn()}>
            가져오기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScModal;
