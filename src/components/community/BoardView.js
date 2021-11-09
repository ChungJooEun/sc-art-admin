import React, { useEffect } from "react";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import Paging from "../basic-components/Paging";
import SideMenuBar from "../basic-components/SideMenuBar";
import BoardList from "./board-components/BoardList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];
const BoardView = ({ pageTitle }) => {
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
      <div class="preloader">
        <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      </div>
      <div
        class="mdk-drawer-layout js-mdk-drawer-layout"
        data-push
        data-responsive-width="992px"
      >
        <div class="mdk-drawer-layout__content page-content">
          <GlobalBar />
          <PageTitle pageTitle={pageTitle} pagePathList={pagePathList} />

          <div class="container-fluid page__container">
            <div class="page-section">
              <div class="page-separator">
                <div class="page-separator__text">{pageTitle}(20)</div>
              </div>
              <div
                class="navbar navbar-expand x-0 navbar-light bg-body"
                id="default-navbar"
                data-primary=""
              >
                <form class="d-none d-md-flex">
                  <button
                    type="button"
                    class="btn btn-accent"
                    onClick={() =>
                      (window.location.href = "notice-board-detail")
                    }
                  >
                    글쓰기{" "}
                  </button>
                </form>
                <div class="flex"></div>
                <button
                  class="btn btn-warning ml-16pt"
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
                  class="d-none"
                  data-swal-type="success"
                  data-swal-title="삭제완료"
                  data-swal-text="삭제 완료되었습니다."
                ></div>
              </div>
              <div class="card dashboard-area-tabs mb-32pt">
                <div
                  class="table-responsive"
                  data-toggle="lists"
                  data-lists-sort-by="js-lists-values-date"
                  data-lists-sort-desc="true"
                  data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
                >
                  <BoardList />
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
export default BoardView;
