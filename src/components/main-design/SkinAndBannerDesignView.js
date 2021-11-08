import React from "react";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

import MainBanner from "./skin-banner-design-components/MainBanner";
import NoticeAndEventBanner from "./skin-banner-design-components/NoticeAndEventBanner";
import VideoManagement from "./skin-banner-design-components/VideoManagement";

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

const SkinAndBannerDesignView = () => {
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
            pageTitle={"메인 배너/스킨 관리"}
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <MainBanner />
            <NoticeAndEventBanner />

            <VideoManagement />

            <div className="save-button page-section">
              <button className="btn btn btn-secondary ml-16pt">취소</button>
              <button
                className="btn btn-success"
                data-toggle="swal"
                data-swal-title="완료!"
                data-swal-text="새로운 관리자가 등록되었습니다!"
                data-swal-type="success"
              >
                저장
              </button>
            </div>
            <div className="page-section"></div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};
export default SkinAndBannerDesignView;
