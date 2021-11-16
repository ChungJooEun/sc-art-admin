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
    let userId = window.sessionStorage.getItem("userid");
    let token = window.sessionStorage.getItem("token");

    if (!userId || userId === undefined) {
      history.push("/common/login");
    }

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    // console.log("user id : " + userId + "\ntoken : " + token);

    // const srcList = [
    //   `${process.env.PUBLIC_URL}/assets/vendor/jquery.min.js`,
    //   `${process.env.PUBLIC_URL}/assets/vendor/popper.min.js`,
    //   `${process.env.PUBLIC_URL}/assets/vendor/bootstrap.min.js`,
    //   `${process.env.PUBLIC_URL}/assets/vendor/perfect-scrollbar.min.js`,
    //   `${process.env.PUBLIC_URL}/assets/vendor/dom-factory.js`,
    //   `${process.env.PUBLIC_URL}/assets/vendor/material-design-kit.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/app.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/hljs.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/settings.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
    //   `${process.env.PUBLIC_URL}/assets/vendor/list.min.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/list.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/toggle-check-all.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/check-selected-row.js`,
    //   `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
    // ];
    // let scriptList = [];

    // for (let i = 0; i < srcList.length; i++) {
    //   const script = document.createElement("script");
    //   script.src = process.env.PUBLIC_URL + srcList[i];
    //   scriptList.push(script);
    //   document.body.appendChild(script);
    // }

    // return () => {
    //   for (let i = 0; i < scriptList.length; i++) {
    //     document.body.removeChild(scriptList[i]);
    //   }
    // };
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
