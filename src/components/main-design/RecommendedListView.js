import React, { useEffect, useState, useContext } from "react";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

import CheckableEventList from "../event/event-components/CheckableEventList";
import CheckablePlaceList from "../place/place-components/CheckablePlaceList";

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

  const { actions } = useContext(MenuContext);

  useEffect(() => {
    if (window.location.href.includes("place")) {
      setPage("place");

      actions.setMenu({
        topMenu: 1,
        subMenu: 2,
      });
    } else {
      actions.setMenu({
        topMenu: 1,
        subMenu: 1,
      });
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
      script.async = true;
      scriptList.push(script);
      document.body.appendChild(script);
    }

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, []);

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
          <GlobalBar />

          {modalOn ? (
            <SelectListModal
              CheckableListComponent={
                page === "event" ? CheckableEventList : CheckablePlaceList
              }
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
