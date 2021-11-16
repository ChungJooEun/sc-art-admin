import React, { useEffect, useState } from "react";

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
  // 메인 베너
  const [mainBanner, setMainBanner] = useState(null);
  // 공지사항/이벤트 배너
  const [noticeAndEventBanner, setNoticeAndEventBanner] = useState([]);
  // 서리풀 청년 아트 개럴리
  const [artGalleryVideos, setArtGalleryVideos] = useState([]);
  // 서리풀 악끼거리
  const [instrumentStreetVideos, setInstrumentStreetVideos] = useState([]);
  // 서초 금요 음악회
  const [fridayConcertVideos, setFridayConcertVideos] = useState([]);
  // 서초 실내악 축제
  const [chamverMusicVideos, setChamverMusicVidoes] = useState([]);

  useEffect(() => {
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
      `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
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

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  });

  return (
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
  );
};
export default SkinAndBannerDesignView;
