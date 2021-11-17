import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MenuContext from "../../context/menu";

import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import GlobarBar from "../basic-components/GlobalBar";
import Paging from "../basic-components/Paging";

import CheckableEventList from "./event-components/CheckableEventList";

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

const EventListView = ({ pageTitle, type }) => {
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

  const getEventList = useCallback(async () => {
    const url = `http://118.67.154.118:3000/api/admin/cultural-event/list/${type}`;
    // const url = `/api/admin/cultural-event/list/${type}`;

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
          userid: window.sessionStorage.getItem("userid"),
        },
      });

      if (response.status === 200) {
        setEventList(response.data.list);
        setTotalNumber(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, period, searchInfo, type, sortInfo]);

  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
  };

  const { actions } = useContext(MenuContext);
  useEffect(() => {
    switch (type) {
      case "exhibition":
        actions.setMenu({
          topMenu: 2,
          subMenu: 1,
        });
        break;
      case "show":
        actions.setMenu({
          topMenu: 2,
          subMenu: 2,
        });
        break;
      case "other":
        actions.setMenu({
          topMenu: 2,
          subMenu: 3,
        });
        break;
      default:
        break;
    }

    getEventList();
  }, [getEventList, type]);

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
        <GlobarBar />

        <PageTitle
          pageTitle={pageTitle}
          pagePathList={pagePathList}
          showSearchBar={true}
          searching={searching}
          searchOptions={searchOptions}
        />

        <div className="container-fluid page__container">
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">
                {pageTitle}({totalNumber})
              </div>
            </div>
            <div
              className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
              id="default-navbar"
              data-primary=""
            >
              <form className="d-none d-md-flex">
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={() => history.push("/event/add-event")}
                >
                  새로운 행사 등록하기 +{" "}
                </button>
              </form>
              <div className="flex"></div>
              <form className="d-none d-md-flex">
                <select
                  id="custom-select"
                  className="form-control custom-select"
                >
                  <option selected>서초구 축제</option>
                  <option value="1">축제1</option>
                  <option value="2">축제2</option>
                  <option value="3">축제3</option>
                </select>
              </form>
              <form className="d-none d-md-flex">
                <button type="button" className="btn btn-primary">
                  등록/이동{" "}
                </button>
              </form>
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

export default EventListView;
