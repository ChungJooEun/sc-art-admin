import React, { useEffect } from "react";

import GlobalBar from "../basic-components/GlobalBar";
import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import Editor from "../basic-components/editor-components/Editor";
import VideoAddForm from "../basic-components/video-components/VideoAddForm";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";

import EventInfoForm from "./add-form-components/EventInfoForm";
import Curation from "./add-form-components/Curation";
import RejectSection from "../basic-components/RejectSection";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/event/event-manage",
    pageName: "문화행사 관리",
  },
];

const EventDetailView = ({ options, isApproved }) => {
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

          <PageTitle
            pageTitle="문화행사 등록하기"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <EventInfoForm />

              <Curation />

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">상세정보</div>
                </div>

                <Editor />
              </div>

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">관련 영상 업로드</div>
                </div>
                <div className="list-group-item">
                  <VideoAddForm />
                </div>
                <div className="row card-group-row">
                  <VideoListItem />
                  <VideoListItem />
                  <VideoListItem />
                </div>
              </div>

              <div className="detail_under_menu ">
                <div className="card">
                  <PostSaveBtn options={options} />
                  {isApproved ? "" : <RejectSection />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};

export default EventDetailView;
