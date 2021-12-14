import React, { useEffect, useContext } from "react";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";
import PublicApiInfoEventList from "./event-components/PublicApiInfoEventList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const PublicApiInfoView = () => {
  const { actions, state } = useContext(MenuContext);
  useEffect(() => {
    if (state.menu.topMenu !== 2 || state.menu.subMenu !== 8) {
      actions.setMenu({
        topMenu: 2,
        subMenu: 8,
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
        <PageTitle pagePathList={pagePathList} pageTitle="공공API 정보" />

        <div className="container-fluid page__container">
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">문화행사(12)</div>
            </div>
            <div className="card dashboard-area-tabs mb-32pt">
              <div
                className="table-responsive"
                data-toggle="lists"
                data-lists-sort-by="js-lists-values-date"
                data-lists-sort-desc="true"
                data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
              >
                <PublicApiInfoEventList />
              </div>

              {/* api 구현 후, Paging 컴포넌트로 교체 */}
              <div className="card-footer p-8pt">
                <ul className="pagination justify-content-start pagination-xsm m-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true" className="material-icons">
                        chevron_left
                      </span>
                      <span>Prev</span>
                    </a>
                  </li>
                  <li className="page-item dropdown">
                    <a
                      className="page-link dropdown-toggle"
                      data-toggle="dropdown"
                      href="#"
                      aria-label="Page"
                    >
                      <span>1</span>
                    </a>
                    <div className="dropdown-menu">
                      <a href="" className="dropdown-item active">
                        1
                      </a>
                      <a href="" className="dropdown-item">
                        2
                      </a>
                      <a href="" className="dropdown-item">
                        3
                      </a>
                      <a href="" className="dropdown-item">
                        4
                      </a>
                      <a href="" className="dropdown-item">
                        5
                      </a>
                    </div>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span>Next</span>
                      <span aria-hidden="true" className="material-icons">
                        chevron_right
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};

export default PublicApiInfoView;
