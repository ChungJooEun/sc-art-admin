import React, { useEffect } from "react";

import Editor from "../basic-components/editor-components/Editor";
import GlobalBar from "../basic-components/GlobalBar";
import ImageForm from "../basic-components/ImageForm";
import PostSaveBtn from "../basic-components/PostSaveBtn";
import SideMenuBar from "../basic-components/SideMenuBar";
import RelatedSiteFormList from "./board-components/RelatedSiteFormList";
import PageTitle from "../basic-components/PageTitle";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/related-sites/realted-sites",
    pageName: "문화 파트너스",
  },
];

const options = [
  { value: "TEMP_SAVE", name: "임시저장" },
  { value: "POST", name: "게시" },
  { value: "PRIVATE", name: "비공개" },
];

const AddRelatedSiteView = () => {
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
            pageTitle="문화 파트너스 추가"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="row">
                <ImageForm />

                <div className="col-lg-8">
                  <RelatedSiteFormList />
                </div>
              </div>

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">상세정보</div>
                </div>
                <div className="list-group-item">
                  <div className="form-group row align-items-center mb-0">
                    <label
                      id="label-question"
                      for="question"
                      className="col-md-2 col-form-label form-label"
                    >
                      제목
                    </label>
                    <div className="col-md-10">
                      <input
                        id="maskSample01"
                        type="text"
                        className="form-control"
                        placeholder="제목"
                        data-mask="#.##0,00"
                        data-mask-reverse="true"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
                <br />

                <Editor />
              </div>
              <div className="page-section">
                <div className="detail_under_menu ">
                  <div className="card">
                    <PostSaveBtn options={options} />
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

export default AddRelatedSiteView;
