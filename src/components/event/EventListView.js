import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

const EventListView = ({ pageTitle, type }) => {
  const history = useHistory();

  const [eventList, setEventList] = useState(null);
  const [totalNumber, setTotalNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const getEventList = useCallback(async () => {
    const url = `http://118.67.154.118:3000/api/admin/cultural-event/list/${type}`;

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: "desc",
          sort_column: "create_date",
          page: pageNumber,
          count: count,
          from_date: "20000101",
          to_date: "20221231",
        },
      });

      if (response.status === 200) {
        setEventList(response.data.list);
        setTotalNumber(response.data.total_count);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, type]);

  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
  };

  useEffect(() => {
    // 스크립트 추가 코드
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
      `${process.env.PUBLIC_URL}/assets/vendor/moment.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/moment-range.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/Chart.min.js`,
      `${process.env.PUBLIC_URL}/assets/js/chartjs.js`,
      `${process.env.PUBLIC_URL}/assets/js/chartjs-rounded-bar.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/list.min.js`,
      `${process.env.PUBLIC_URL}/assets/js/list.js`,
      `${process.env.PUBLIC_URL}/assets/js/toggle-check-all.js`,
      `${process.env.PUBLIC_URL}/assets/js/check-selected-row.js`,
      `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
    ];
    let scriptList = [];

    for (let i = 0; i < srcList.length; i++) {
      const script = document.createElement("script");
      script.src = process.env.PUBLIC_URL + srcList[i];
      scriptList.push(script);
      document.body.appendChild(script);
    }

    // list init 코드
    getEventList();

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, [getEventList]);

  if (loading) {
    return <p>로딩중..</p>;
  }

  if (!eventList) {
    return <p>fail to loading data</p>;
  }

  return (
    <>
      {/* <div className="preloader">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div> */}
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
    </>
  );
};

export default EventListView;
