import React, { useEffect, useState } from "react";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

import CheckableEventList from "../event/event-components/CheckableEventList";
import SelectListModal from "./recommndedList-components/SelectListModal";
import RecommendedList from "./recommndedList-components/RecommendedList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/main-design/skin-and-banner-design",
    pageName: "메인디자인 관리",
  },
];

const RecommendedListView = () => {
  const [page, setPage] = useState("event");
  const [modalOn, setModalOn] = useState(false);

  const toggleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    if (window.location.href.includes("place")) {
      setPage("place");
    }

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
      script.async = true;
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

          {modalOn ? (
            <SelectListModal
              CheckableListComponent={CheckableEventList}
              closeModal={toggleModal}
            />
          ) : (
            ""
          )}

          <PageTitle
            pageTitle={
              page === "event" ? "추천 문화행사 리스트" : "추천 문화공간 리스트"
            }
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <RecommendedList />
            </div>

            <button
              className="btn btn-primary modal-btn"
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "18px",
                marginTop: "40px",
                width: "100%",
              }}
              onClick={toggleModal}
            >
              {page === "event"
                ? "기존 문화행사 가져오기 +"
                : "기존 문화공간 가져오기 +"}
            </button>
            <div
              className="btn-wrap"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                className="btn btn-secondary"
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "18px",
                  marginTop: "40px",
                  width: "49%",
                  marginRight: "5px",
                }}
              >
                초기화
              </button>
              <button
                className="btn btn-primary"
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "18px",
                  marginTop: "40px",
                  width: "49%",
                  marginLeft: "5px",
                }}
              >
                저장
              </button>
            </div>
            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">
                  {page === "event"
                    ? "메인에 노출되는 문화행사(20)"
                    : "메인에 노출되는 문화공간(20)"}
                </div>
              </div>
              <RecommendedList />
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};

export default RecommendedListView;
