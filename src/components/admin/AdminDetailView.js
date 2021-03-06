import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import Paging from "../basic-components/Paging";
import GlobalBar from "../basic-components/GlobalBar";

import AdminInfo from "./admin-detail-components/AdminInfo";
import EventList from "../event/event-components/EventList";
import PlaceList from "../place/place-components/PlaceList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const AdminDetailView = () => {
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

  const history = useHistory();
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
          <PageTitle pageTitle="관리자 상세" pagePathList={pagePathList} />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="page-separator"></div>
              <div className="card dashboard-area-tabs mb-32pt">
                <AdminInfo />
              </div>
              <button
                className="btn btn btn-secondary ml-16pt"
                onClick={() => history.push("/admin/admin-manage")}
              >
                뒤로
              </button>
              <button
                className="btn btn-success"
                onClick={() => history.push("/admin/admin-account-edit")}
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
                    등록 허가한 행사
                  </a>
                  <a
                    href="#"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                  >
                    등록 허가한 공간
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
              </div>
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};
export default AdminDetailView;
