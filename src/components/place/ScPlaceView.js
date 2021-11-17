import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MenuContext from "../../context/menu";

import EditorTest from "../basic-components/editor-components/EditorTest";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import PostSaveBtn from "../basic-components/PostSaveBtn";
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
const options = [
  { value: "TEMP_SAVE", name: "임시저장" },
  { value: "POST", name: "게시" },
  { value: "PRIVATE", name: "비공개" },
];
const ScPlaceView = ({ pageTitle }) => {
  const history = useHistory();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [postState, setPostState] = useState(null);
  const [detail, setDetail] = useState(null);
  const getDetail = (e) => {
    setDetail(e);
  };

  const postScPlace = async (placeData) => {
    const url = "http://118.67.154.118:3000/api/admin/seoripul-space/regist";
    // const url = "/api/admin/seoripul-space/regist";

    try {
      const response = await axios.post(url, placeData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(response.status);
      if (response.status === 200) {
        console.log(response.data);
        history.push("/place/place-manage");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitEvent = (formState) => {
    let formData = new FormData();

    if (id !== null) formData.append(id, id);
    formData.append("name", name);
    formData.append("state", formState);
    formData.append("more_information", detail);
    formData.append("userid", window.sessionStorage.getItem("userid"));

    postScPlace(formData);
  };

  const { actions } = useContext(MenuContext);
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

    const getScplaceInfo = async () => {
      const url = "http://118.67.154.118:3000/api/admin/seoripul-space/list";
      // const url = "/api/admin/seoripul-space/list";

      const res = await axios.get(url);

      if (res.status === 200) {
        let findData = false;

        for (let i = res.data.list.length - 1; -1 < i; i--) {
          if (res.data.list[i].name === pageTitle) {
            setName(res.data.list[i].name);
            setPostState(res.data.list[i].state);
            setDetail(res.data.list[i].more_information);
            setId(res.data.id);
            findData = true;
            break;
          }
        }

        if (!findData) {
          setName(pageTitle);
          setPostState("");
          setDetail("");
        }
      }
    };

    if (pageTitle === "서리풀 청년아트 센터") {
      actions.setMenu({
        topMenu: 3,
        subMenu: 5,
      });
    } else {
      actions.setMenu({
        topMenu: 3,
        subMenu: 6,
      });
    }

    getScplaceInfo();

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, [pageTitle]);

  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <GlobalBar />
        <PageTitle pageTitle={pageTitle} pagePathList={pagePathList} />

        <div className="container-fluid page__container">
          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">상세정보</div>
              </div>

              <EditorTest more_information={detail} getDetail={getDetail} />
            </div>
            <div className="page-section">
              <div className="detail_under_menu ">
                <div className="card">
                  <PostSaveBtn
                    options={options}
                    onSubmitEvent={onSubmitEvent}
                    state={postState}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};
export default ScPlaceView;
