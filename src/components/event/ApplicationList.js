import React, { useEffect, useState } from "react";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import Paging from "../basic-components/Paging";
import SideMenuBar from "../basic-components/SideMenuBar";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const dataEventList = [
  {
    id: 1,
    name: "행사이름 1",
    event_type_name: "전시",
    address: "주소 1",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 2,
    name: "행사이름 2",
    event_type_name: "공연",
    address: "주소 2",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 3,
    name: "행사이름 3",
    event_type_name: "기타",
    address: "주소 3",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 4,
    name: "행사이름 4",
    event_type_name: "전시",
    address: "주소 4",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 5,
    name: "행사이름 5",
    event_type_name: "기타",
    address: "주소 5",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "대기중", // 누락
  },
];

const dataPlaceList = [
  {
    id: 1,
    name: "공간이름 1",
    space_type_name: "공연장",
    address: "주소 1",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 2,
    name: "공간이름 2",
    space_type_name: "연습실",
    address: "주소 2",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "기각", // 누락
  },
  {
    id: 3,
    name: "공간이름 3",
    space_type_name: "연습실",
    address: "주소 3",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "기각", // 누락
  },
  {
    id: 4,
    name: "공간이름 4",
    space_type_name: "악기상점",
    address: "주소 4",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "게시", // 누락
  },
  {
    id: 5,
    name: "공간이름 5",
    space_type_name: "갤러리",
    address: "주소 4",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "기각", // 누락
  },
];

const count = 5;

const ApplicationList = ({ tableTitle, Table }) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const getEventList = () => {
    // axios 코드 추가
    setList(dataEventList);
    setLoading(false);
  };

  const getPlaceList = () => {
    // axios 코드 추가
    setList(dataPlaceList);
    setLoading(false);
  };

  useEffect(() => {
    if (window.location.href.includes("event")) {
      getEventList();
    } else {
      getPlaceList();
    }

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
  }, []);

  if (loading) {
    return <p>loading..</p>;
  }

  if (!list) {
    return <p>fail to loading data</p>;
  }

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

          <PageTitle pageTitle="등록 신청 리스트" pagePathList={pagePathList} />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">{tableTitle}(12)</div>
              </div>
              <div className="card dashboard-area-tabs mb-32pt">
                <Table list={list} pageNumber={pageNumber} count={count} />
                <Paging />
              </div>
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};

export default ApplicationList;
