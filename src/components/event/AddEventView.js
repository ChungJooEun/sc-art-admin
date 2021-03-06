import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import EditorTest from "../basic-components/editor-components/EditorTest";
import VideoAddFormTest from "../basic-components/video-components/VideoAddFormTest";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";
import ImageFormEvent from "../basic-components/ImageFormEvent";
import PostCodeModal from "../basic-components/PostCodeModal";

import EventInfoFormTest from "./add-form-components/EventInfoFormTest";
import CurationTest from "./add-form-components/CurationTest";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/event/event-manage",
    pageName: "문화행사 관리",
  },
];

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

const AddEventView = ({ options }) => {
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

  const [formInfo, setFormInfo] = useState({
    name: "",
    location: "",
    address1: "",
    address2: "",
    open_date: new Date(),
    close_date: new Date(),
    age: "",
    homepage: "",
    reservation_site: "",
    phone: "",
    price: "",
    state: "TEMP_SAVE",
  });
  const [openTime, setOpenTime] = useState("10:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [imgFile, setImgFile] = useState(null);
  const [curationInfo, setCurationInfo] = useState(null);
  const [detail, setDetail] = useState("");
  const [videos, setVideos] = useState([]);
  const [vId, setVId] = useState(1);

  const history = useHistory();

  const postEvent = async (eventData) => {
    const url =
      "https://culture.seocho.go.kr:3000/api/admin/cultural-event/regist";

    try {
      const response = await axios.post(url, eventData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("새로운 문화행사가 등록되었습니다.");
        history.push("/event/event-manage");
      }
    } catch (e) {
      alert("새로운 문화행사가 등록중, 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onHandleSubmitEvent = () => {
    let formData = new FormData();

    if (imgFile) {
      formData.append("file", imgFile[0]);
    }

    formData.append("name", formInfo.name);
    formData.append("location", formInfo.location);
    formData.append("address1", formInfo.address1);
    formData.append("address2", formInfo.address2);
    formData.append("open_date", convertDateFormat(formInfo.open_date));
    formData.append("close_date", convertDateFormat(formInfo.close_date));
    formData.append("age", formInfo.age);
    formData.append("homepage", formInfo.homepage);
    formData.append("reservation_site", formInfo.reservation_site);
    formData.append("phone", formInfo.phone);
    formData.append("price", formInfo.price);
    formData.append("open_time", openTime);
    formData.append("close_time", closeTime);
    formData.append("festival_id", curationInfo.festival_id);
    formData.append("state", formInfo.state);
    formData.append("more_information", detail);
    formData.append("userid", window.sessionStorage.getItem("userid"));

    var vAry;

    // curation
    vAry = new Array();
    for (let i = 0; i < curationInfo.event_field.length; i++) {
      vAry.push(curationInfo.event_field[i]);
    }
    formData.append("event_field", vAry);

    vAry = new Array();
    for (let i = 0; i < curationInfo.event_theme.length; i++) {
      vAry.push(curationInfo.event_theme[i]);
    }
    formData.append("event_theme", vAry);

    formData.append("event_type", curationInfo.event_type);

    vAry = new Array();
    let temp;
    for (let i = 0; i < videos.length; i++) {
      temp = new Object();
      temp.url = videos[i].url;
      vAry.push(temp);
    }
    formData.append("videos", JSON.stringify(vAry));

    postEvent(formData);
  };

  const onSubmitEvent = useConfirm(
    "문화행사를 등록하시겠습니까?",
    onHandleSubmitEvent
  );

  const getDetail = (e) => {
    setDetail(e);
  };

  const getFormInfo = (dataName, data) => {
    setFormInfo({
      ...formInfo,
      [dataName]: data,
    });
  };

  const getPeriod = (date1, date2) => {
    setFormInfo({
      ...formInfo,
      open_date: date1,
      close_date: date2,
    });
  };

  const selectPlace = (location, address1, address2) => {
    setFormInfo({
      ...formInfo,
      location: location,
      address1: address1,
      address2: address2,
    });
  };

  const getCurationInfo = (dataName, data) => {
    if (dataName === "event_type") {
      setCurationInfo({
        ...curationInfo,
        [dataName]: data,
        event_field: null,
      });
    } else {
      setCurationInfo({
        ...curationInfo,
        [dataName]: data,
      });
    }
  };

  const getImgFile = (imgFile) => {
    setImgFile(imgFile);
  };

  const getVideoInfo = (url) => {
    setVideos(videos.concat({ url: url, vId: vId }));
    setVId(vId + 1);
  };

  const getTimeInfo = (name, data) => {
    if (name === "open_time") {
      setOpenTime(data);
    } else {
      setCloseTime(data);
    }
  };

  const getAddress = (address) => {
    getFormInfo("address1", address);
  };

  const [showPostCodeModal, setShowPostCodeModal] = useState(false);
  const togglePostCodeModal = () => {
    setShowPostCodeModal(!showPostCodeModal);
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
      topMenu: 2,
      subMenu: 5,
    });

    setCurationInfo({
      event_type:
        typeof history.location.state === "undefined"
          ? ""
          : history.location.state.eventType,
      event_theme: "",
      event_field: "",
      festival_id: "",
      festival_name: "",
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
  }, [history]);

  if (!curationInfo) {
    return <div></div>;
  }

  return (
    <>
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
          <PageTitle
            pageTitle="문화행사 등록하기"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="row">
                <ImageFormEvent imgSrc={imgFile} getImgFile={getImgFile} />
                <EventInfoFormTest
                  formInfo={formInfo}
                  getFormInfo={getFormInfo}
                  getPeriod={getPeriod}
                  open_time={openTime}
                  close_time={closeTime}
                  getTimeInfo={getTimeInfo}
                  togglePostCodeModal={togglePostCodeModal}
                  selectPlace={selectPlace}
                />
              </div>

              <CurationTest
                curationInfo={curationInfo}
                getCurationInfo={getCurationInfo}
              />

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
                    onSubmitEvent={onSubmitEvent}
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
    </>
  );
};

export default AddEventView;
