import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import GlobalBar from "../basic-components/GlobalBar";
import Paging from "../basic-components/Paging";
import PageTitle from "../basic-components/PageTitle";
import CheckablePlaceList from "./place-components/CheckablePlaceList";
import SideMenuBar from "../basic-components/SideMenuBar";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/place/place-manage",
    pageName: "문화공간",
  },
];

const count = 5;
const convertDateFormat = (dateString) => {
  const date = new Date(dateString);

  let str = "" + date.getFullYear();

  if (date.getMonth() < 9) {
    str += "0" + (date.getMonth() + 1);
  } else {
    str += date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    str += "0" + date.getDate();
  } else {
    str += date.getDate();
  }
  return str;
};
const PlaceListView = ({ pageTitle, type }) => {
  const history = useHistory();

  const [placeList, setPlaceList] = useState([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInfo, setSearchInfo] = useState({
    search_type: "",
    search_word: "",
  });

  const getSearchInfo = (dataName, data) => {
    setSearchInfo({
      ...searchInfo,
      [dataName]: data,
    });
  };
  const searching = (dateRange) => {
    console.log(dateRange);

    if (dateRange.length === 1) {
      let date = convertDateFormat(dateRange[0]);
      getPlaceList(date, date);
    } else {
      getPlaceList(
        convertDateFormat(dateRange[0]),
        convertDateFormat(dateRange[1])
      );
    }
  };

  const getPlaceList = useCallback(
    async (startDate, endDate) => {
      const url = `http://118.67.154.118:3000/api/admin/cultural-space/list/${type}`;
      // const url = `/api/admin/cultural-space/list/${type}`;

      try {
        const response = await axios.get(url, {
          params: {
            sort_type: "desc",
            sort_column: "create_date",
            page: pageNumber,
            count: count,
            from_date: startDate,
            to_date: endDate,
            search_type: searchInfo.search_type,
            search_word: searchInfo.search_word,
          },
        });

        if (response.status === 200) {
          setPlaceList(response.data.list);
          setTotalNumber(response.data.total_count);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [pageNumber, type]
  );

  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
  };

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

    getPlaceList();

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, [getPlaceList]);

  if (placeList === null) {
    return <p>fail to loading data</p>;
  }

  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <GlobalBar />
        <PageTitle
          pageTitle={pageTitle}
          pagePathList={pagePathList}
          searchInfo={searchInfo}
          getSearchInfo={getSearchInfo}
          searching={searching}
        />

        <div className="container-fluid page__container">
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">
                {pageTitle}({totalNumber})
              </div>
            </div>
            <div
              className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
              id="default-navbar"
              data-primary=""
            >
              <form className="d-none d-md-flex">
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={() => history.push("/place/add-place")}
                >
                  새로운 공간 등록하기 +{" "}
                </button>
              </form>
              <div className="flex"></div>
              <button
                className="btn btn-warning ml-16pt"
                data-toggle="swal"
                data-swal-title="정말 삭제 하시겠습니까??"
                data-swal-text="이 동작은 다시 되돌릴 수 없습니다."
                data-swal-type="warning"
                data-swal-show-cancel-button="true"
                data-swal-confirm-button-text="확인"
                data-swal-confirm-cb="#swal-confirm-delete"
                data-swal-close-on-confirm="false"
              >
                삭제
              </button>
              <div
                id="swal-confirm-delete"
                className="d-none"
                data-swal-type="success"
                data-swal-title="삭제완료"
                data-swal-text="삭제 완료되었습니다."
              ></div>
            </div>
            <div className="card dashboard-area-tabs mb-32pt">
              <div
                className="table-responsive"
                data-toggle="lists"
                data-lists-sort-by="js-lists-values-date"
                data-lists-sort-desc="true"
                data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
              >
                <CheckablePlaceList
                  list={placeList}
                  pageNumber={pageNumber}
                  count={count}
                />
              </div>
              <Paging
                pageNumber={pageNumber}
                getPageNumber={getPageNumber}
                totalNum={totalNumber}
                count={count}
              />
            </div>
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};
export default PlaceListView;
