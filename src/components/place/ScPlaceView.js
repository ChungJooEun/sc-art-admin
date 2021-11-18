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
  const [postState, setPostState] = useState("");
  const [detail, setDetail] = useState("");
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
    console.log(formState);

    let formData = new FormData();

    formData.append("name", pageTitle);
    formData.append("state", formState);
    formData.append("more_information", detail);
    formData.append("userid", window.sessionStorage.getItem("userid"));

    postScPlace(formData);
  };

  const { actions } = useContext(MenuContext);
  useEffect(() => {
    const getScplaceInfo = async () => {
      const url = `http://118.67.154.118:3000/api/admin/seoripul-space/detail/${encodeURIComponent(
        pageTitle
      )}`;

      try {
        const res = await axios.get(url);

        if (res.status === 200) {
          console.log(res.data);

          setPostState(res.data.state);
          setDetail(res.data.more_information);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getScplaceInfo();

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
