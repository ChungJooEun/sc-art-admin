import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import MenuContext from "../../context/menu";

import SideMenuBar from "../basic-components/SideMenuBar";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SearchBar from "../basic-components/search-bar-components/SeachBar";
import Paging from "../basic-components/Paging";

import CheckableEventList from "../event/event-components/CheckableEventList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];
const count = 5;

const searchOptions = [
  { value: "EVENT_NAME", label: "행사명" },
  { value: "WRITER", label: "작성자" },
  { value: "LOCATION", label: "위치" },
  { value: "FESTIVAL_NAME", label: "축제명" },
];
const EventManageView = () => {
  const useConfirm = (message = null, onConfirm) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      }
    };
    return confirmAction;
  };

  const history = useHistory();

  const [eventList, setEventList] = useState([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [period, setPeriod] = useState({
    from_date: "",
    to_date: "",
  });
  const [searchInfo, setSearchInfo] = useState({
    search_type: "EVENT_NAME",
    search_word: "",
  });
  const [sortInfo, setSortInfo] = useState({
    sort_column: "create_date",
    sort_type: "desc",
  });

  const [adminGroup, setAdminGroup] = useState();

  const getEventList = useCallback(async () => {
    const url =
      "https://culture.seocho.go.kr:3000/api/admin/cultural-event/list";

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber,
          count: count,
          from_date: period.from_date,
          to_date: period.to_date,
          search_type: searchInfo.search_type,
          search_word: searchInfo.search_word,
          userid:
            adminGroup === "PARTNER"
              ? window.sessionStorage.getItem("userid")
              : "",
        },
      });

      if (response.status === 200) {
        // console.log(response);

        setEventList(response.data.list);
        setTotalNumber(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, period, searchInfo, sortInfo, adminGroup]);

  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
  };

  const searching = (dateRange, searchInfos) => {
    setPeriod(dateRange);
    setSearchInfo(searchInfos);
    setPageNumber(1);
  };

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
  const [allChecked, setAllChecked] = useState(false);

  const addCheckedList = (eventInfo) => {
    setCheckedList(checkedList.concat(eventInfo.id));
  };
  const removeNoneCheckedList = (removeId) => {
    let ary = checkedList;
    ary = ary.filter((id) => id !== removeId);

    setCheckedList(ary);
  };

  const toggleAllChecked = (state) => {
    if (state === true) {
      // 전부 체크 리스트 추가

      let ary = [];
      for (let i = 0; i < eventList.length; i++) {
        ary.push(eventList[i].id);
      }

      setCheckedList(ary);
      setAllChecked(true);
    } else {
      // 체크리스트에서 전부 삭제
      setCheckedList([]);
      setAllChecked(false);
    }
  };

  const [scList, setScList] = useState([]);
  const [selectedScEvent, setSelectedScEvent] = useState("");
  const onChangeScEvent = (e) => {
    setSelectedScEvent(e.target.value);
  };

  const onHandleAddFestival = () => {
    if (selectedScEvent === "" || checkedList.length === 0) {
      return;
    } else {
      const data = new Object();
      let ary = new Array();

      data.festival_id = selectedScEvent;

      for (let i = 0; i < checkedList.length; i++) {
        ary.push(checkedList[i]);
      }
      data.related_event_list = ary;
      data.userid = window.sessionStorage.getItem("userid");

      addRelatedEvent(data);
    }
  };

  const addRelatedEvent = async (formData) => {
    const url =
      "https://culture.seocho.go.kr:3000/api/admin/seochogu-festival/add/related-event";

    try {
      const res = await axios.post(url, formData);

      if (res.status === 200) {
        alert("관련 문화행사 목록 추가 및 변경이 완료되었습니다.");
        getEventList();
      }
    } catch (e) {
      alert("관련 문화행사 목록 추가 및 변경에 실패하였습니다.");
      console.log(e);
    }
  };

  const onClickAddBtn = useConfirm(
    "선택하신 문화행사를 관련행사 목록으로 등록하시겠습니까?",
    onHandleAddFestival
  );

  const onHandleDelete = () => {
    if (checkedList.length === 0) {
      return;
    } else {
      const data = new Object();
      let ary = [];

      for (let i = 0; i < checkedList.length; i++) {
        ary.push(checkedList[i]);
      }

      data.id_list = JSON.stringify(ary);
      data.userid = window.sessionStorage.getItem("userid");

      deleteEvents(data);
    }
  };

  const deleteEvents = async (data) => {
    const url = "https://culture.seocho.go.kr:3000/api/admin/cultural-event";

    try {
      const res = await axios.delete(url, {
        data: data,
      });

      if (res.status === 200) {
        alert("삭제되었습니다.");
        getEventList();
      }
    } catch (e) {
      alert("삭제 중, 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onClickDeleteBtn = useConfirm(
    "선택하신 문화행사를 삭제하시겠습니까?\n삭제된 문화행사는 다시 되돌릴 수 없습니다.",
    onHandleDelete
  );

  const { actions } = useContext(MenuContext);
  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    const admingroup = window.sessionStorage.getItem("adminGroup");

    if (admingroup !== null && admingroup !== undefined) {
      setAdminGroup(admingroup);
    }

    const srcList = [
      `${process.env.PUBLIC_URL}/assets/vendor/jquery.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/popper.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/bootstrap.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/perfect-scrollbar.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/dom-factory.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/material-design-kit.js`,
      `${process.env.PUBLIC_URL}/assets/js/app.js`,
      `${process.env.PUBLIC_URL}/assets/js/hljs.js`,
      `${process.env.PUBLIC_URL}/assets/js/settings.js`,
      `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
    ];
    let scriptList = [];

    for (let i = 0; i < srcList.length; i++) {
      const script = document.createElement("script");
      script.src = process.env.PUBLIC_URL + srcList[i];
      script.async = true;
      scriptList.push(script);
      document.body.appendChild(script);
    }

    const getScEventList = async (admingroup) => {
      const url =
        "https://culture.seocho.go.kr:3000/api/admin/seochogu-festival/list";

      const today = new Date();
      let fromDate = "" + today.getFullYear();

      if (today.getMonth() < 9) {
        fromDate += "0" + (today.getMonth() + 1);
      } else {
        fromDate += today.getMonth() + 1;
      }

      if (today.getDate() < 10) {
        fromDate += "0" + today.getDate();
      } else {
        fromDate += today.getDate();
      }

      try {
        const response = await axios.get(url, {
          params: {
            page: 1,
            count: 1000,
            from_date: fromDate,
            userid:
              admingroup === "PARTNER"
                ? window.sessionStorage.getItem("userid")
                : "",
          },
        });

        if (response.status === 200) {
          setScList(response.data.list);
        }
      } catch (e) {
        console.log(e);
      }
    };

    actions.setMenu({
      topMenu: 2,
      subMenu: 0,
    });

    getEventList();
    getScEventList();

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, [getEventList, history]);

  if (eventList === null) {
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
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <GlobalBar />

        <PageTitle pageTitle="문화행사" pagePathList={pagePathList} />

        <div className="container-fluid page__container">
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">주요 업무</div>
            </div>
            <div className="row mb-lg-8pt">
              <div className="flex" style={{ maxWidth: "100%" }}>
                <button
                  type="button"
                  className="btn btn-block btn-accent btn-lg"
                  onClick={() => history.push("/event/add-event")}
                >
                  + 새로운 행사 등록
                </button>

                <button
                  type="button"
                  className="btn btn-block btn-primary btn-lg"
                  onClick={() => history.push("/event/event-application-list")}
                >
                  + 문화행사 등록 요청 관리
                </button>
                <button
                  type="button"
                  className="btn btn-block btn-primary btn-lg"
                  onClick={() => history.push("/event/seocho-festival")}
                >
                  + 서초구 축제 관리
                </button>
              </div>
            </div>
          </div>

          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">행사 종류별 목록</div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big  gradient-1"
                      // onClick={() => history.push("/event/event-list-all")}
                    >
                      전체행사
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-1"
                      onClick={() => history.push("/event/exhibit-list")}
                    >
                      전시
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-1"
                      onClick={() => history.push("/event/festival-list")}
                    >
                      공연
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-1"
                      onClick={() => history.push("/event/event-others-list")}
                    >
                      기타
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-32pt position-relative z-1">
            <div className="container-fluid page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
              <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
                <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                  <h2 className="mb-0">전체 문화행사</h2>
                </div>
                <div className="flex"></div>

                <SearchBar
                  searching={searching}
                  searchOptions={searchOptions}
                />
              </div>
            </div>
          </div>
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">전체({totalNumber})</div>
            </div>
            <div
              className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
              id="default-navbar"
              data-primary=""
            >
              <form className="d-none d-md-flex">
                <Link
                  to={{
                    pathname: "/event/add-event",
                    state: { eventType: "" },
                  }}
                >
                  <button type="button" className="btn btn-accent">
                    새로운 행사 등록하기 +{" "}
                  </button>
                </Link>
              </form>
              <div className="flex"></div>
              <form className="d-none d-md-flex">
                <select
                  id="custom-select"
                  className="form-control custom-select"
                  placeholder="축제 선택"
                  defaultValue="default"
                  onChange={(e) => onChangeScEvent(e)}
                >
                  <option disabled value="default">
                    서초구 축제 선택
                  </option>
                  {scList.map((scInfo) => (
                    <option value={scInfo.id} key={scInfo.id}>
                      {scInfo.name}
                    </option>
                  ))}
                </select>
              </form>
              <div className="d-none d-md-flex">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onClickAddBtn()}
                >
                  등록/이동{" "}
                </button>
              </div>
              <button
                className="btn btn-warning ml-16pt"
                data-toggle="swal"
                data-swal-title="정말 삭제 하시겠습니까??"
                data-swal-text="이 동작은 다시 되돌릴 수 없습니다."
                data-swal-type="warning"
                data-swal-show-cancel-button="true"
                data-swal-confirm-button-text="확인"
                data-swal-confirm-cb="#swal-confirm-delete"
                data-swal-close-on-confirm="false"
                onClick={() => onClickDeleteBtn()}
              >
                삭제
              </button>
              <div
                id="swal-confirm-delete"
                className="d-none"
                data-swal-type="success"
                data-swal-title="삭제완료"
                data-swal-text="삭제 완료되었습니다."
              ></div>
            </div>
            <div className="card dashboard-area-tabs mb-32pt">
              <div
                className="table-responsive"
                data-toggle="lists"
                data-lists-sort-by="js-lists-values-date"
                data-lists-sort-desc="true"
                data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
              >
                <CheckableEventList
                  list={eventList}
                  pageNumber={pageNumber}
                  count={count}
                  sorting={sorting}
                  addCheckedList={addCheckedList}
                  removeNoneCheckedList={removeNoneCheckedList}
                  toggleAllChecked={toggleAllChecked}
                  allChecked={allChecked}
                />
              </div>
              <Paging
                pageNumber={pageNumber}
                getPageNumber={getPageNumber}
                totalNum={totalNumber}
                count={count}
              />
            </div>
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};

export default EventManageView;
