import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Paging from "../../basic-components/Paging";

const count = 10;

const SelectListModal = ({
  CheckableListComponent,
  closeModal,
  getListAtModal,
  disabledList,
}) => {
  const [list, setList] = useState([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortInfo, setSortInfo] = useState({
    sort_column: "create_date",
    sort_type: "desc",
  });

  const getPageNumber = (curNumber) => {
    setPageNumber(curNumber);
  };

  const getEventList = useCallback(async () => {
    const url = "http://118.67.154.118:3000/api/admin/cultural-event/list";
    // const url = '/api/admin/cultural-event/list';

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber,
          count: count,
          userid: window.sessionStorage.getItem("userid"),
        },
      });

      if (response.status === 200) {
        setList(response.data.list);
        setTotalNumber(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, sortInfo]);

  const getPlaceList = useCallback(async () => {
    const url = "http://118.67.154.118:3000/api/admin/cultural-space/list";
    // const url = '/api/admin/cultural-space/list';

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber,
          count: count,
          userid: window.sessionStorage.getItem("userid"),
        },
      });

      if (response.status === 200) {
        setList(response.data.list);
        setTotalNumber(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, sortInfo]);

  const sorting = (columnName) => {
    if (columnName === sortInfo.sort_column) {
      setSortInfo({
        ...sortInfo,
        sort_type: sortInfo.sort_type === "desc" ? "asc" : "desc",
      });
    } else {
      setSortInfo({
        sort_column: columnName,
        sort_type: "desc",
      });
    }
  };

  const [checkedList, setCheckedList] = useState([]);
  const addCheckedList = (listInfo) => {
    setCheckedList(checkedList.concat(listInfo));
  };
  const removeNoneCheckedList = (removeId) => {
    let ary = checkedList;
    ary = ary.filter((item) => item.id !== removeId);

    setCheckedList(ary);
  };

  const onClickGetBtn = () => {
    getListAtModal(checkedList);
    closeModal();
  };

  useEffect(() => {
    // url 파싱
    if (window.location.href.includes("event")) {
      getEventList();
    } else {
      getPlaceList();
    }
  }, [getEventList, getPlaceList]);

  if (list === null) {
    return (
      <div className="preloader">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
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
          <h3 style={{ marginRight: "200px" }}>
            총 {totalNumber}건 / 선택 {checkedList.length}건
          </h3>
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
          sorting={sorting}
          addCheckedList={addCheckedList}
          removeNoneCheckedList={removeNoneCheckedList}
          disabledList={disabledList}
        />
        <Paging
          pageNumber={pageNumber}
          getPageNumber={getPageNumber}
          totalNum={totalNumber}
          count={count}
        />
        <div className="btn-wrap" style={{ textAlign: "center" }}>
          <a>
            <button className="btn btn-primary" onClick={() => onClickGetBtn()}>
              가져오기
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SelectListModal;
