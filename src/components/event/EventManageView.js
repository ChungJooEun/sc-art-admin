import React, { useEffect } from "react";

import SideMenuBar from "../basic-components/SideMenuBar";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SearchBar from "../basic-components/SeachBar";
import Paging from "../basic-components/Paging";

import CheckableEventList from "../event/event-components/CheckableEventList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const EventManageView = () => {
  useEffect(() => {
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
  });
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
                    onClick={() => (window.location.href = "/event/add-event")}
                  >
                    + 새로운 행사 등록
                  </button>
                  <button
                    type="button"
                    className="btn btn-block btn-primary btn-lg"
                    onClick={() =>
                      (window.location.href = "/event/event-application-list")
                    }
                  >
                    + 문화행사 등록 요청 관리
                  </button>
                  <button
                    type="button"
                    className="btn btn-block btn-primary btn-lg"
                    onClick={() => (window.location.href = "seocho-festival")}
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
                        onClick={() =>
                          (window.location.href = "event-list-all")
                        }
                      >
                        전체행사
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-block btn-lg btn-big gradient-1"
                        onClick={() =>
                          (window.location.href = "/event/exhibit-list")
                        }
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
                        onClick={() =>
                          (window.location.href = "/event/festival-list")
                        }
                      >
                        공연
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-block btn-lg btn-big gradient-1"
                        onClick={() =>
                          (window.location.href = "/event/event-others-list")
                        }
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

                  <SearchBar />
                </div>
              </div>
            </div>
            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">전체(12)</div>
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
                    onClick={() => (window.location.href = "/event/add-event")}
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
                    <option selected="">서초구 축제</option>
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
                  <CheckableEventList />
                </div>
                <Paging />
              </div>
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};

export default EventManageView;