import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import Paging from "../basic-components/Paging";
import SideMenuBar from "../basic-components/SideMenuBar";
import CheckablePlaceList from "./place-components/CheckablePlaceList";
import SearchKeywordBar from "../basic-components/search-bar-components/SearchKeywordBar";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const count = 5;

const searchOptions = [
  { value: "SPACE_NAME", label: "공간명" },
  { value: "WRITER", label: "작성자" },
  { value: "LOCATION", label: "위치" },
];
const PlaceManageView = () => {
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
    const url =
      "https://culture.seocho.go.kr:3000/api/admin/cultural-space/list";

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
  }, [pageNumber, searchInfo, sortInfo, adminGroup]);

  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
    getPlaceList(pickNumber);
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
      const res = await axios.delete(url, {
        data: formData,
      });

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

    if (admingroup !== null && admingroup !== undefined) {
      setAdminGroup(admingroup);
    }

    actions.setMenu({
      topMenu: 3,
      subMenu: 0,
    });
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

        <PageTitle pageTitle="문화 공간" pagePathList={pagePathList} />

        <div className="container-fluid page__container">
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">주요 업무</div>
            </div>
            <div className="row mb-lg-8pt">
              <div className="flex" style={{ maxWidth: "100%" }}>
                <button
                  type="button"
                  className="btn btn-block btn-accent btn-lg"
                  onClick={() => history.push("/place/add-place")}
                >
                  + 새로운 문화공간 등록
                </button>
                <button
                  type="button"
                  className="btn btn-block btn-primary btn-lg"
                  onClick={() => history.push("/place/place-application-list")}
                >
                  + 문화공간 등록 요청 관리
                </button>
              </div>
            </div>
          </div>

          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">행사 종류별 목록</div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-3"
                      onClick={() => history.push("/place/place-manage")}
                    >
                      전체공간
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-3"
                      onClick={() => history.push("/place/concert-hall-list")}
                    >
                      공연장
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-3"
                      onClick={() => history.push("/place/practice-list")}
                    >
                      연습실
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-3"
                      onClick={() =>
                        history.push("/place/musical-instrument-shop")
                      }
                    >
                      악기상점
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-3"
                      onClick={() => history.push("/place/gallery-list")}
                    >
                      갤러리
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">
                서리풀 자체 운영 문화공간
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-4"
                      onClick={() => history.push("/place/scplace-art-center")}
                    >
                      서리풀 청년아트 센터
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big gradient-4"
                      onClick={() => history.push("/place/scplace-art-gallery")}
                    >
                      서리풀 청년아트 갤러리
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-lg btn-big btn-accent"
                    >
                      + 추가하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-32pt position-relative z-1">
            <div className="container-fluid page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
              <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
                <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                  <h2 className="mb-0">전체 문화공간</h2>
                </div>

                <SearchKeywordBar
                  searching={searching}
                  searchOptions={searchOptions}
                />
              </div>
            </div>
          </div>
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">전체({totalNumber})</div>
            </div>
            <div
              className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
              id="default-navbar"
              data-primary=""
            >
              <div className="d-none d-md-flex">
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={() => history.push("/place/add-place")}
                >
                  새로운 공간 등록하기 +{" "}
                </button>
              </div>
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

export default PlaceManageView;
