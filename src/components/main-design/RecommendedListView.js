import React, { useEffect, useState, useContext, useCallback } from "react";
import MenuContext from "../../context/menu";
import axios from "axios";

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

  const deleteItemAddList = (rId) => {
    let ary = addedList;
    ary = ary.filter((item) => item.id !== rId);

    setAddedList(ary);
  };

  const deleteItemRecommendList = (rId) => {
    let ary = recommendList;
    ary = ary.filter((item) => item.id !== rId);

    setRecommendList(ary);
  };

  const getListAtModal = (selectedList) => {
    let ary;

    // 이미 추가된 리스트 중복 제거
    if (addedList.length > 0) {
      ary = selectedList;

      for (let i = 0; i < addedList.length; i++) {
        ary = ary.filter((item) => item.id !== addedList[i].id);
      }
    } else {
      ary = selectedList;
    }

    const isEvent = window.location.href.includes("event") ? true : false;
    let convertAry = [];
    for (let i = 0; i < ary.length; i++) {
      convertAry.push({
        id: ary[i].id,
        name: ary[i].name,
        location: isEvent
          ? ary[i].location
          : ary[i].address1 + " " + ary[i].address2,
        image: Object.keys(ary[i].resources).includes("images")
          ? ary[i].resources.images[0].url
          : null,
        sort: 1,
      });
    }

    setAddedList(addedList.concat(convertAry));
  };

  const hasSameSortNumber = () => {
    let checked = new Array(addedList.length + recommendList.length);

    checked.fill(0);

    for (let i = 0; i < addedList.length; i++) {
      if (checked[addedList[i].sort - 1] === 0) {
        checked[addedList[i].sort - 1] = 1;
      } else {
        console.log("같은 순서값이 존재합니다");
        return false;
      }
    }

    for (let i = 0; i < recommendList.length; i++) {
      if (checked[recommendList[i].sort - 1] === 0) {
        checked[recommendList[i].sort - 1] = 1;
      } else {
        console.log("같은 순서값이 존재합니다");
        return false;
      }
    }
    return true;
  };

  const getSortNumberAddedList = (id, sortNumber) => {
    let ary = [];

    for (let i = 0; i < addedList.length; i++) {
      if (addedList[i].id === id) {
        ary.push({
          ...addedList[i],
          sort: parseInt(sortNumber),
        });
      } else {
        ary.push(addedList[i]);
      }
    }

    setAddedList(ary);
  };

  const getSortNumberRecommendList = (id, sortNumber) => {
    let ary = [];

    console.log(id + "    " + sortNumber);
    for (let i = 0; i < recommendList.length; i++) {
      if (recommendList[i].id === id) {
        ary.push({
          ...recommendList[i],
          sort: parseInt(sortNumber),
        });
      } else {
        ary.push(recommendList[i]);
      }
    }

    setRecommendList(ary);
  };

  const onClickSaveBtn = () => {
    if (!hasSameSortNumber()) {
      return;
    }

    const formdata = new FormData();

    //   type: 행사 or 공간,
    formdata.append(
      "type",
      window.location.href.includes("event")
        ? "cultural_event"
        : "cultural_space"
    );

    let ary = new Array();
    // data:{id: 행사/공간 ID, name: 행사/공간명, location: 주소, sort: 순서, image : 이미지 저장 경로}
    for (let i = 0; i < recommendList.length; i++) {
      ary.push(recommendList[i]);
    }

    for (let i = 0; i < addedList.length; i++) {
      ary.push(addedList[i]);
    }

    formdata.append("data", JSON.stringify(ary));

    // 등록자
    formdata.append("userid", window.sessionStorage.getItem("userid"));

    for (let key of formdata.keys()) console.log("formData KEY : " + key);

    for (let value of formdata.values())
      console.log("formDaa VALUE : " + value);

    saveRecommendList(formdata);
  };

  const saveRecommendList = async (data) => {
    const url =
      "http://118.67.154.118:3000/api/admin/main/regist/recommendations";
    // const url = "/api/admin/main/regist/recommendations";

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        console.log(" ======= success to post recommended list ========");
        console.log(res.data);
        getRecommendedList();
        setAddedList([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 초기화
  const getRecommendedList = useCallback(async () => {
    const url =
      "http://118.67.154.118:3000/api/admin/main/list/recommendations";

    try {
      const res = await axios.get(url, {
        params: {
          type: window.location.href.includes("place")
            ? "cultural_space"
            : "cultural_event",
        },
      });

      if (res.status === 200) {
        const { list } = res.data;

        let ary = [];
        for (let i = 0; i < list.length; i++) {
          ary.push({
            id: list[i].content_id,
            name: list[i].content_name,
            location: list[i].content_location,
            image: list[i].image,
            sort: list[i].sort,
          });
        }

        setRecommendList(ary);
      }
    } catch (e) {
      console.log(e);
      setRecommendList([]);
    }
  }, []);

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
    setAddedList([]);
    getRecommendedList();

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
  }, [getRecommendedList, window.location.href]);

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
            <RecommendedList
              list={addedList}
              deletItem={deleteItemAddList}
              getSortNumber={getSortNumberAddedList}
              totalCount={recommendList.length + addedList.length}
            />
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
            <RecommendedList
              list={recommendList}
              deletItem={deleteItemRecommendList}
              getSortNumber={getSortNumberRecommendList}
              totalCount={recommendList.length + addedList.length}
            />
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};

export default RecommendedListView;
