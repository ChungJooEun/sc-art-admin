import React, { useEffect } from "react";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";
import AdminInfoForm from "./admin-components/AdminInfoForm";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const AddAdminView = () => {
  useEffect(() => {
    const srcList = [
      "/assets/vendor/jquery.min.js",
      "/assets/vendor/popper.min.js",
      "/assets/vendor/bootstrap.min.js",
      "/assets/vendor/perfect-scrollbar.min.js",
      "/assets/vendor/dom-factory.js",
      "/assets/vendor/material-design-kit.js",
      "/assets/js/app.js",
      "/assets/js/hljs.js",
      "/assets/js/settings.js",
      "/assets/vendor/moment.min.js",
      "/assets/vendor/moment-range.js",
      "/assets/vendor/Chart.min.js",
      "/assets/js/chartjs.js",
      "/assets/js/chartjs-rounded-bar.js",
      "/assets/js/page.projects.js",
      "/assets/js/page.analytics-2-dashboard.js",
      "/assets/vendor/list.min.js",
      "/assets/js/list.js",
      "/assets/js/toggle-check-all.js",
      "/assets/js/check-selected-row.js",
      "/assets/js/app-settings.js",
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
          <PageTitle pageTitle="관리자 관리" pagePathList={pagePathList} />

          <div className="container-fluid page__container">
            <div className="container-fluid page__container">
              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">관리자 등록하기</div>
                </div>
                <AdminInfoForm />
                <button
                  className="btn btn btn-secondary ml-16pt"
                  onClick={() => (window.location.href = "/admin/admin-manage")}
                >
                  취소
                </button>
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
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};

export default AddAdminView;
