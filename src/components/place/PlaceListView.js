import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import GlobalBar from "../basic-components/GlobalBar";
import Paging from "../basic-components/Paging";
import PageTitle from "../basic-components/PageTitle";
import CheckablePlaceList from "./place-components/CheckablePlaceList";
import SideMenuBar from "../basic-components/SideMenuBar";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/place/place-manage",
    pageName: "문화공간",
  },
];

const count = 5;

const PlaceListView = ({ pageTitle, type }) => {
  const [placeList, setPlaceList] = useState(null);
  const [totalNumber, setTotalNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const getPlaceList = useCallback(async () => {
    const url = `/api/admin/cultural-space/list/${type}`;

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: "desc",
          sort_column: "create_date",
          page: pageNumber,
          count: count,
        },
      });

      if (response.status === 200) {
        setPlaceList(response.data.list);
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
    getPlaceList();
    const srcList = [
      "/assets/vendor/jquery.min.js",
      "/assets/vendor/popper.min.js",
      "/assets/vendor/bootstrap.min.js",
      "/assets/vendor/perfect-scrollbar.min.js",
      "/assets/vendor/dom-factory.js",
      "/assets/vendor/material-design-kit.js",
      "/assets/js/app.js",
      "/assets/js/hljs.js",
      "/assets/js/settings.js",
      "/assets/vendor/moment.min.js",
      "/assets/vendor/moment-range.js",
      "/assets/vendor/Chart.min.js",
      "/assets/js/chartjs.js",
      "/assets/js/chartjs-rounded-bar.js",
      "/assets/js/page.projects.js",
      "/assets/js/page.analytics-2-dashboard.js",
      "/assets/vendor/list.min.js",
      "/assets/js/list.js",
      "/assets/js/toggle-check-all.js",
      "/assets/js/check-selected-row.js",
      "/assets/js/app-settings.js",
    ];
    let scriptList = [];

    for (let i = 0; i < srcList.length; i++) {
      const script = document.createElement("script");
      script.src = process.env.PUBLIC_URL + srcList[i];
      scriptList.push(script);
      document.body.appendChild(script);
    }

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, [getPlaceList]);

  if (loading) {
    return <p>loading..</p>;
  }

  if (!placeList) {
    return <p>fail to loading data</p>;
  }

  return (
    <>
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
      <div
        className="mdk-drawer-layout js-mdk-drawer-layout"
        data-push
        data-responsive-width="992px"
      >
        <div className="mdk-drawer-layout__content page-content">
          <GlobalBar />
          <PageTitle pageTitle={pageTitle} pagePathList={pagePathList} />

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
                    onClick={() => (window.location.href = "add-place")}
                  >
                    새로운 공간 등록하기 +{" "}
                  </button>
                </form>
                <div className="flex"></div>
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
                  <CheckablePlaceList
                    list={placeList}
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
export default PlaceListView;
