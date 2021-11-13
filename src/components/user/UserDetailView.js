import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import Paging from "../basic-components/Paging";
import SideMenuBar from "../basic-components/SideMenuBar";

import EventList from "../event/event-components/EventList";
import PlaceList from "../place/place-components/PlaceList";

import UserInfo from "./user-detail-components/UserInfo";
import UserReviewList from "./user-detail-components/UserReviewList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/user/user-list",
    pageName: "사용자 목록",
  },
];

const UserDetailView = () => {
  const history = useHistory();
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

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  });
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
          <PageTitle
            pageTitle="사용자 상세페이지"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">
                  회원정보 | 계정 생성일 : 2021.07.01 / 최종 접속일 : 2021.07.01
                </div>
              </div>
              <UserInfo />
              <button
                className="btn btn btn-secondary ml-16pt"
                onclick="location.href='../user/user-list.html'"
              >
                뒤로
              </button>
              <button
                className="btn btn-success"
                onClick={() => history.push("/user/user-detail-edit")}
              >
                수정하기
              </button>
              <br />
              <br />
            </div>
            <div className="flex" style={{ maxWidth: "100%" }}>
              <div className="card p-relative o-hidden mb-0">
                <div
                  className="card-header card-header-tabs-basic nav px-0"
                  role="tablist"
                >
                  <a
                    href="#"
                    className="active"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="true"
                  >
                    등록한 행사
                  </a>
                  <a
                    href="#"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                  >
                    등록한 공간
                  </a>
                  <a
                    href="#"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                  >
                    등록한 리뷰
                  </a>
                </div>

                <div className="card-body text-70">
                  <div className="card dashboard-area-tabs mb-32pt">
                    <div
                      className="table-responsive"
                      data-toggle="lists"
                      data-lists-sort-by="js-lists-values-date"
                      data-lists-sort-desc="true"
                      data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
                    >
                      <EventList />
                    </div>
                    <Paging />
                  </div>
                </div>
                <div className="card-body text-70">
                  <div className="card dashboard-area-tabs mb-32pt">
                    <div
                      className="table-responsive"
                      data-toggle="lists"
                      data-lists-sort-by="js-lists-values-date"
                      data-lists-sort-desc="true"
                      data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
                    >
                      <PlaceList />
                    </div>
                    <Paging />
                  </div>
                </div>
                <div className="card-body text-70">
                  <UserReviewList />
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

export default UserDetailView;
