import React, { useEffect, useContext, useState } from "react";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

import StatisticalTable from "./statistical-components/StatisticalTable";
import CulturalEventByField from "./statistical-components/CulturalEventByField";
import CulturalEventByLocation from "./statistical-components/CulturalEventByLocation";
import SearchPeriodBar from "../basic-components/search-bar-components/SearchPeriodBar";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const StatisticalTableView = () => {
  const { actions, state } = useContext(MenuContext);

  const [period, setPeriod] = useState({
    from_date: "",
    to_date: "",
  });

  const searching = (dateRange) => {
    setPeriod(dateRange);
  };

  useEffect(() => {
    if (state.menu.topMenu !== 2 || state.menu.subMenu !== 7) {
      actions.setMenu({
        topMenu: 2,
        subMenu: 7,
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
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <GlobalBar />
        <PageTitle
          pagePathList={pagePathList}
          pageTitle="문화행사 통계"
          showSearchBar={true}
          searching={searching}
          SearchComponent={SearchPeriodBar}
        />

        <div className="container-fluid page__container">
          <div className="page-section">
            <div className="row mb-lg-8pt">
              <CulturalEventByField period={period} />
              <CulturalEventByLocation period={period} />
            </div>
            <StatisticalTable period={period} />
          </div>
        </div>
      </div>

      <SideMenuBar />
    </div>
  );
};

export default StatisticalTableView;
