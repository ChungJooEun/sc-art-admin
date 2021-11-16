import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  useEffect(() => {
    // let userId = window.localStorage.getItem("userid");
    // let token = window.localStorage.getItem("token");

    let userId = window.sessionStorage.getItem("userid");
    let token = window.sessionStorage.getItem("token");

    if (!userId || userId === undefined) {
      history.push("/common/login");
    }

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    // console.log("user id : " + userId + "\ntoken : " + token);
  }, []);

  return (
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
  );
};
export default DashBoardView;
