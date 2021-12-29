import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import MenuContext from "../../context/menu";

import SideMenuBar from "../basic-components/SideMenuBar";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import ImageFormPlace from "../basic-components/ImageFormPlace";
import PostCodeModal from "../basic-components/PostCodeModal";

import PlaceInfoForm from "./add-form-components/PlaceInfoForm";
import EditorTest from "../basic-components/editor-components/EditorTest";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";
import VideoAddFormTest from "../basic-components/video-components/VideoAddFormTest";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/place/place-manage",
    pageName: "문화공간 관리",
  },
];

const categoryOptions = [
  { value: "HALL", label: "공연장" },
  { value: "PRACTICE", label: "연습실" },
  { value: "GALLERY", label: "갤러리" },
  { value: "INSTRUMENT", label: "악기상점" },
];

const AddPlaceView = ({ options }) => {
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

  const [formInfo, setFormInfo] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [openTime, setOpenTime] = useState("10:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [detail, setDetail] = useState("");
  const [videos, setVideos] = useState([]);
  const [vId, setVId] = useState(1);

  const getFormInfo = (dataName, data) => {
    setFormInfo({
      ...formInfo,
      [dataName]: data,
    });
  };

  const getDetail = (e) => {
    setDetail(e);
  };

  const getTimeInfo = (name, data) => {
    if (name === "open_time") {
      setOpenTime(data);
    } else {
      setCloseTime(data);
    }
  };

  const getVideoInfo = (url) => {
    setVideos(videos.concat({ url: url, vId: vId }));
    setVId(vId + 1);
  };

  const getAddress = (address) => {
    getFormInfo("address1", address);
  };

  const [showPostCodeModal, setShowPostCodeModal] = useState(false);
  const togglePostCodeModal = () => {
    setShowPostCodeModal(!showPostCodeModal);
  };

  const getImgFile = (imgFile) => {
    setImgFile(imgFile);
  };

  const postPlace = async (placeData) => {
    const url =
      "https://culture.seocho.go.kr:3000/api/admin/cultural-space/regist";

    try {
      const response = await axios.post(url, placeData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("등록되었습니다.");
        history.push("/place/place-manage");
      }
    } catch (e) {
      alert("문화공간 등록 중, 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onHandleSubmitPlace = () => {
    let formData = new FormData();

    if (imgFile) {
      formData.append("file", imgFile[0]);
    }

    formData.append("name", formInfo.name);
    formData.append("location", formInfo.name);
    formData.append("address1", formInfo.address1);
    formData.append("address2", formInfo.address2);
    formData.append("homepage", formInfo.homepage);
    formData.append("phone", formInfo.phone);
    formData.append("holiday", formInfo.holiday);
    formData.append("open_time", openTime);
    formData.append("close_time", closeTime);
    formData.append("state", formInfo.state);
    formData.append("more_information", detail);
    formData.append("userid", window.sessionStorage.getItem("userid"));
    formData.append("space_type", formInfo.space_type);

    let vAry = new Array();
    let temp;
    for (let i = 0; i < videos.length; i++) {
      temp = new Object();
      temp.url = videos[i].url;
      vAry.push(temp);
    }
    formData.append("videos", JSON.stringify(vAry));

    // for (let key of formData.keys()) {
    //   console.log(key);
    // }

    // for (let v of formData.values()) {
    //   console.log(v);
    // }

    postPlace(formData);
  };

  const onSubmitPlace = useConfirm(
    "새로운 문화공간을 등록하시겠습니까?",
    onHandleSubmitPlace
  );

  const getDefaultOptions_category = (category) => {
    const defaultOptions = [];

    if (category === undefined) {
      return [];
    }

    for (let j = 0; j < categoryOptions.length; j++) {
      if (category === categoryOptions[j].value) {
        defaultOptions.push(categoryOptions[j]);
        break;
      }
    }

    return defaultOptions;
  };

  const removeVideo = (removeId) => {
    let ary = videos;

    ary = ary.filter((video) => video.vId !== removeId);

    setVideos(ary);
  };

  const { actions } = useContext(MenuContext);
  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    actions.setMenu({
      topMenu: 3,
      subMenu: 7,
    });

    setFormInfo({
      name: "",
      address1: "",
      address2: "",
      homepage: "",
      phone: "",
      holiday: "",
      resources: null,
      state: "TEMP_SAVE",
      space_type:
        typeof history.location.state === "undefined"
          ? ""
          : history.location.state.spaceType,
      space_type_name: "",
    });

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

  if (!formInfo) {
    return <div></div>;
  }

  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <GlobalBar />
        {showPostCodeModal ? (
          <PostCodeModal
            getAddress={getAddress}
            closeModal={togglePostCodeModal}
          />
        ) : (
          ""
        )}
        <PageTitle pageTitle="문화공간 등록하기" pagePathList={pagePathList} />

        <div className="container-fluid page__container">
          <div className="page-section">
            <div className="row">
              <ImageFormPlace imgSrc={imgFile} getImgFile={getImgFile} />
              <PlaceInfoForm
                formInfo={formInfo}
                getFormInfo={getFormInfo}
                open_time={openTime}
                close_time={closeTime}
                getTimeInfo={getTimeInfo}
                togglePostCodeModal={togglePostCodeModal}
              />
            </div>
            <div className="page-section">
              <div className="form-group">
                <label className="form-label" htmlFor="select01">
                  종류
                </label>
                <Select
                  options={categoryOptions}
                  defaultValue={getDefaultOptions_category(formInfo.space_type)}
                  closeMenuOnSelect={true}
                  id="select01"
                  placeholder="종류 선택"
                  onChange={(e) => getFormInfo("space_type", e.value)}
                />
              </div>
            </div>
            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">상세정보</div>
              </div>
              <EditorTest more_information={detail} getDetail={getDetail} />
            </div>

            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">관련 영상 업로드</div>
              </div>
              <div className="list-group-item">
                <VideoAddFormTest getVideoInfo={getVideoInfo} />
              </div>
              <div className="row card-group-row">
                {videos.map((video) => (
                  <VideoListItem
                    videoInfo={video}
                    removeVideo={removeVideo}
                    key={video.vId}
                  />
                ))}
              </div>
            </div>
            <div className="detail_under_menu ">
              <div className="card">
                <PostSaveBtn
                  options={options}
                  onSubmitEvent={onSubmitPlace}
                  state={formInfo.state}
                  getFormInfo={getFormInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};

export default AddPlaceView;
