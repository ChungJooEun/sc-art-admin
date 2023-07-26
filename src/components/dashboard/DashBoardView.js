import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";
import SearchPeriodBar from "../basic-components/search-bar-components/SearchPeriodBar";

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
  const { actions } = useContext(MenuContext);

  const [period, setPeriod] = useState({
    from_date: "",
    to_date: "",
  });

  const searching = (dateRange) => {
    setPeriod(dateRange);
  };

  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    actions.setMenu({
      topMenu: 0,
      subMenu: 0,
    });

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
  }, [history]);

  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <GlobalBar />

        <PageTitle
          pageTitle={"대시보드"}
          pagePathList={pagePathList}
          showSearchBar={true}
          searching={searching}
          SearchComponent={SearchPeriodBar}
        />

        <div className="container-fluid page__container">
          <Summary period={period}/>
          <TaskRequest period={period}/>
        </div>
      </div>

      <SideMenuBar />
    </div>
  );
};
export default DashBoardView;
