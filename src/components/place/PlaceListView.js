import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import GlobalBar from "../basic-components/GlobalBar";
import Paging from "../basic-components/Paging";
import PageTitle from "../basic-components/PageTitle";
import CheckablePlaceList from "./place-components/CheckablePlaceList";
import SideMenuBar from "../basic-components/SideMenuBar";
import MenuContext from "../../context/menu";
import SearchKeywordBar from "../basic-components/search-bar-components/SearchKeywordBar";

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
const searchOptions = [
  { value: "SPACE_NAME", label: "공간명" },
  { value: "WRITER", label: "작성자" },
  { value: "LOCATION", label: "위치" },
];
const PlaceListView = ({ pageTitle, type }) => {
  const useConfirm = (message = null, onConfirm) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      }
    };
    return confirmAction;
  };

  const history = useHistory();

  const [placeList, setPlaceList] = useState([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInfo, setSearchInfo] = useState({
    search_type: "SPACE_NAME",
    search_word: "",
  });
  const [sortInfo, setSortInfo] = useState({
    sort_column: "create_date",
    sort_type: "desc",
  });

  const [adminGroup, setAdminGroup] = useState();

  const searching = (searchInfos) => {
    setSearchInfo(searchInfos);
    setPageNumber(1);
  };

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

  const getPlaceList = useCallback(async () => {
    const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-space/list/${type}`;

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber,
          count: count,
          search_type: searchInfo.search_type,
          search_word: searchInfo.search_word,
          userid:
            adminGroup === "PARTNER"
              ? window.sessionStorage.getItem("userid")
              : "",
        },
      });

      if (response.status === 200) {
        setPlaceList(response.data.list);
        setTotalNumber(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber, type, searchInfo, sortInfo, adminGroup]);

  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
  };

  const [checkedList, setCheckedList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const addCheckedList = (placeInfo) => {
    setCheckedList(checkedList.concat(placeInfo.id));
  };
  const removeNoneCheckedList = (removeId) => {
    let ary = checkedList;
    ary = ary.filter((id) => id !== removeId);

    setCheckedList(ary);
  };
  const toggleAllChecked = (state) => {
    if (state === true) {
      // 전부 체크 리스트 추가
      let ary = [];
      for (let i = 0; i < placeList.length; i++) {
        ary.push(placeList[i].id);
      }

      setCheckedList(ary);
      setAllChecked(true);
    } else {
      // 체크리스트에서 전부 삭제
      setCheckedList([]);
      setAllChecked(false);
    }
  };

  const onHandleDelete = () => {
    if (checkedList.length === 0) {
      return;
    } else {
      const data = new Object();
      let ary = new Array();

      for (let i = 0; i < checkedList.length; i++) {
        ary.push(checkedList[i]);
      }
      data.id_list = ary;
      data.userid = window.sessionStorage.getItem("userid");

      deletePlaces(data);
    }
  };
  const deletePlaces = async (formData) => {
    const url = "https://culture.seocho.go.kr:3000/api/admin/cultural-space";

    try {
      const res = await axios.delete(url, { data: formData });

      if (res.status === 200) {
        alert("삭제되었습니다.");
      }

      getPlaceList();
    } catch (e) {
      alert("삭제 중, 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onClickDeleteBtn = useConfirm(
    "선택하신 문화공간 삭제하시겠습니까?\n삭제된 문화공간은 다시 되돌릴 수 없습니다.",
    onHandleDelete
  );

  const { actions } = useContext(MenuContext);
  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    let admingroup = window.sessionStorage.getItem("adminGroup");

    if (admingroup !== null && admingroup !== null) {
      setAdminGroup(admingroup);
    }

    switch (type) {
      case "hall":
        actions.setMenu({
          topMenu: 3,
          subMenu: 1,
        });
        break;
      case "practice":
        actions.setMenu({
          topMenu: 3,
          subMenu: 2,
        });
        break;
      case "instrument":
        actions.setMenu({
          topMenu: 3,
          subMenu: 3,
        });
        break;
      case "gallery":
        actions.setMenu({
          topMenu: 3,
          subMenu: 4,
        });
        break;
      default:
        break;
    }

    getPlaceList();

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
  }, [getPlaceList]);

  if (placeList === null) {
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
        <PageTitle
          pageTitle={pageTitle}
          pagePathList={pagePathList}
          showSearchBar={true}
          searching={searching}
          searchOptions={searchOptions}
          SearchComponent={SearchKeywordBar}
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
                <Link
                  to={{
                    pathname: "/place/add-place",
                    state: { spaceType: type.toUpperCase() },
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-accent"
                    onClick={() => history.push("/place/add-place")}
                  >
                    새로운 공간 등록하기 +{" "}
                  </button>
                </Link>
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
                onClick={() => onClickDeleteBtn()}
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
                  sorting={sorting}
                  addCheckedList={addCheckedList}
                  removeNoneCheckedList={removeNoneCheckedList}
                  toggleAllChecked={toggleAllChecked}
                  allChecked={allChecked}
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
