import React from "react";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

import Summary from "../dashboard/dashboard-components/Summary";
import TaskRequest from "./dashboard-components/TaskRequest";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const DashBoardView = () => {
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

          <PageTitle pageTitle={"대시보드"} pagePathList={pagePathList} />

          <div className="container-fluid page__container">
            <Summary />
            <TaskRequest />
          </div>
        </div>

        <SideMenuBar />
      </div>
    </>
  );
};
export default DashBoardView;
