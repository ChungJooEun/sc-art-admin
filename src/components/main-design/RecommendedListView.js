import React, { useEffect, useState, useContext } from "react";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

import CheckableEventList from "../event/event-components/CheckableEventList";
import CheckablePlaceList from "../place/place-components/CheckablePlaceList";

import SelectListModal from "./recommndedList-components/SelectListModal";
import RecommendedList from "./recommndedList-components/RecommendedList";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/main-design/skin-and-banner-design",
    pageName: "메인디자인 관리",
  },
];

const RecommendedListView = () => {
  const [modalOn, setModalOn] = useState(false);

  const toggleModal = () => {
    setModalOn(!modalOn);
  };

  const [recommendList, setRecommendList] = useState(null);
  const [addedList, setAddedList] = useState([]);

  const getListAtModal = (selectedList) => {
    setAddedList(selectedList);
  };

  const onClickSaveBtn = () => {
    // axios 요청
  };

  const { actions } = useContext(MenuContext);
  useEffect(() => {
    if (window.location.href.includes("place")) {
      actions.setMenu({
        topMenu: 1,
        subMenu: 2,
      });
    } else {
      actions.setMenu({
        topMenu: 1,
        subMenu: 1,
      });
    }

    // 초기화
    setRecommendList([]);

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

  if (recommendList === null) {
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

        {modalOn ? (
          <SelectListModal
            CheckableListComponent={
              window.location.href.includes("event")
                ? CheckableEventList
                : CheckablePlaceList
            }
            getListAtModal={getListAtModal}
            closeModal={toggleModal}
            disabledList={recommendList}
          />
        ) : (
          ""
        )}

        <PageTitle
          pageTitle={
            window.location.href.includes("event")
              ? "추천 문화행사 리스트"
              : "추천 문화공간 리스트"
          }
          pagePathList={pagePathList}
        />

        <div className="container-fluid page__container">
          <div className="page-section">
            <RecommendedList list={addedList} />
          </div>

          <button
            className="btn btn-primary modal-btn"
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: "18px",
              marginTop: "40px",
              width: "100%",
            }}
            onClick={toggleModal}
          >
            {window.location.href.includes("event")
              ? "기존 문화행사 가져오기 +"
              : "기존 문화공간 가져오기 +"}
          </button>
          <div
            className="btn-wrap"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              className="btn btn-secondary"
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "18px",
                marginTop: "40px",
                width: "49%",
                marginRight: "5px",
              }}
            >
              초기화
            </button>
            <button
              className="btn btn-primary"
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "18px",
                marginTop: "40px",
                width: "49%",
                marginLeft: "5px",
              }}
              onClick={() => onClickSaveBtn()}
            >
              저장
            </button>
          </div>
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">
                {window.location.href.includes("event")
                  ? `메인에 노출되는 문화행사(${recommendList.length})`
                  : `메인에 노출되는 문화공간(${recommendList.length})`}
              </div>
            </div>
            <RecommendedList list={recommendList} />
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};

export default RecommendedListView;
