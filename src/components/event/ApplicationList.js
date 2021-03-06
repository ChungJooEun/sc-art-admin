import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MenuContext from "../../context/menu";

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

const count = 5;

const ApplicationList = ({ tableTitle, Table, type }) => {
  const [list, setList] = useState([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortInfo, setSortInfo] = useState({
    sort_column: "create_date",
    sort_type: "desc",
  });

  const [adminGroup, setAdminGroup] = useState();

  const sorting = (columnName) => {
    if (columnName === sortInfo.sort_column) {
      setSortInfo({
        ...sortInfo,
        sort_type: sortInfo.sort_type === "desc" ? "asc" : "desc",
      });
    } else {
      setSortInfo({
        sort_column: columnName,
        sort_type: "desc",
      });
    }
  };

  const modifyPlaceState = async (id, state) => {
    const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-space/modify/state/${id}`;

    var data = new Object();
    data.userid = window.sessionStorage.getItem("userid");
    data.state = state;

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        alert("게시물 상태가 변경되었습니다.");
        getPlaceList();
      }
    } catch (e) {
      alert("게시물 상태 변경에 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const modifyEventState = async (id, state) => {
    const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-event/modify/state/${id}`;

    var data = new Object();
    data.userid = window.sessionStorage.getItem("userid");
    data.state = state;

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        alert("게시물 상태가 변경되었습니다.");
        getEventList();
      }
    } catch (e) {
      alert("게시물 상태 변경에 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const getEventList = useCallback(async () => {
    const url =
      "https://culture.seocho.go.kr:3000/api/admin/cultural-event/list";

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber,
          count: count,
          userid:
            adminGroup === "PARTNER"
              ? window.sessionStorage.getItem("userid")
              : "",
        },
      });

      if (response.status === 200) {
        setList(response.data.list);
        setTotalNumber(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, sortInfo, adminGroup]);

  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
  };

  const getPlaceList = useCallback(async () => {
    const url =
      "https://culture.seocho.go.kr:3000/api/admin/cultural-space/list";

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber,
          count: count,
          userid:
            adminGroup === "PARTNER"
              ? window.sessionStorage.getItem("userid")
              : "",
        },
      });

      if (response.status === 200) {
        setList(response.data.list);
        setTotalNumber(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, sortInfo, adminGroup]);

  const history = useHistory();
  const { actions } = useContext(MenuContext);
  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    let admingroup = window.sessionStorage.getItem("adminGroup");

    if (admingroup !== null && admingroup !== undefined) {
      setAdminGroup(admingroup);
    }

    if (type === "event") {
      actions.setMenu({
        topMenu: 2,
        subMenu: 6,
      });
      getEventList();
    } else {
      actions.setMenu({
        topMenu: 3,
        subMenu: 8,
      });
      getPlaceList();
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
  }, [getEventList, getPlaceList, type]);

  if (list === null) {
    return (
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
    );
  }

  return (
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
              <div className="page-separator__text">
                {tableTitle}({totalNumber})
              </div>
            </div>
            <div className="card dashboard-area-tabs mb-32pt">
              <Table
                list={list}
                pageNumber={pageNumber}
                count={count}
                sorting={sorting}
                modifyState={
                  window.location.href.includes("event")
                    ? modifyEventState
                    : modifyPlaceState
                }
              />
              <Paging
                pageNumber={pageNumber}
                getPageNumber={getPageNumber}
                totalNum={totalNumber}
                count={count}
                showDelBtn={true}
              />
            </div>
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};

export default ApplicationList;
