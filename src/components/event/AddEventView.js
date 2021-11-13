import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import GlobalBar from "../basic-components/GlobalBar";
import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import Editor from "../basic-components/editor-components/Editor";
import VideoAddForm from "../basic-components/video-components/VideoAddForm";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";

import EventInfoForm from "./add-form-components/EventInfoForm";
import ImageForm from "../basic-components/ImageForm";
import Curation from "./add-form-components/Curation";

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

const convertDateFormat = (str) => {
  const date = new Date(str);

  return "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
};

const AddEventView = ({ options }) => {
  const [formInfo, setFormInfo] = useState({
    name: "",
    location: "",
    address1: "",
    address2: "",
    open_date: convertDateFormat(new Date()),
    close_date: convertDateFormat(new Date()),
    age: "",
    homepage: "",
    phone: "",
    price: "",
    open_time: "9:00",
    close_time: "21:00",
    resources: null,
    festival_id: "",
    state: "TEMP_SAVE",
  });
  const [time, setTime] = useState({
    open_time: "9:00",
    close_time: "21:00",
  });
  const getFormInfo = useCallback((result, time) => {
    setFormInfo(result);
    setTime(time);
  }, []);

  const [curationInfo, setCurationInfo] = useState({
    event_type: "EXHIBITION",
    event_field: [],
    event_theme: [],
    festival_id: "",
  });
  const getCurationInfo = useCallback((info) => {
    setCurationInfo(info);
  }, []);

  const [detail, setDetail] = useState("");
  const getDetail = useCallback((result) => {
    setDetail(result);
  }, []);

  const [vId, setVid] = useState(1);
  const [videos, setVideos] = useState([]);
  const getVideo = useCallback(
    (url) => {
      setVideos(
        videos.concat({
          vId: vId,
          url: url,
        })
      );

      setVid(vId + 1);
    },
    [vId, videos]
  );

  const getVideoId = (url) => {
    let videoId;

    if (url.indexOf("watch?v=") === 24) {
      videoId = url.slice(32, 43);
    } else {
      videoId = url.slice(17, 28);
    }

    return videoId;
  };

  const getImgUrl = useCallback(
    (imgFile) => {
      setFormInfo({
        ...formInfo,
        resources: imgFile,
      });
    },
    [formInfo]
  );

  const history = useHistory();

  const postEvent = async (eventData) => {
    const url = "/api/admin/cultural-event/regist";

    try {
      const response = await axios.post(url, eventData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(response.status);
      if (response.status === 200) {
        console.log(response.data);
        history.push("/event/event-manage");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitEvent = (formState) => {
    let formData = new FormData();

    if (formInfo.resources) {
      formData.append("file", formInfo.resources[0]);
    }

    formData.append("name", formInfo.name);
    formData.append("location", formInfo.location);
    formData.append("address1", formInfo.address1);
    formData.append("address2", formInfo.address2);
    formData.append("open_date", formInfo.open_date);
    formData.append("close_date", formInfo.close_date);
    formData.append("age", formInfo.age);
    formData.append("homepage", formInfo.homepage);
    formData.append("phone", formInfo.phone);
    formData.append("price", formInfo.price);
    formData.append("open_time", formInfo.open_time);
    formData.append("close_time", formInfo.close_time);
    formData.append("festival_id", formInfo.festival_id);
    formData.append("state", formState);
    formData.append("more_information", detail);
    formData.append("userid", "dowon.lee");

    var vAry;
    var temp;

    for (let i = 0; i < curationInfo.event_field.length; i++) {
      // vAry.push(curationInfo.event_field[i]);
      formData.append("event_field", curationInfo.event_field[i]);
    }

    for (let i = 0; i < curationInfo.event_theme.length; i++) {
      formData.append("event_theme", curationInfo.event_theme[i]);
      // vAry.push(curationInfo.event_theme[i]);
    }

    formData.append("event_type", curationInfo.event_type);

    // youtube
    var obj;
    // var ary = [];
    for (let i = 0; i < videos.length; i++) {
      obj = new Object();
      obj.url = videos[i].url;
      formData.append("videos", JSON.stringify(obj));
      // ary.push(obj);
    }
    // formData.append("videos", JSON.stringify(obj));
    // formData.append("videos", JSON.stringify(ary));

    postEvent(formData);
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
      `${process.env.PUBLIC_URL}/assets/vendor/moment.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/moment-range.js`,
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

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  });

  return (
    <>
      {/* <div className="preloader">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div> */}
      <div
        className="mdk-drawer-layout js-mdk-drawer-layout"
        data-push
        data-responsive-width="992px"
      >
        <div className="mdk-drawer-layout__content page-content">
          <GlobalBar />
          <PageTitle
            pageTitle="문화행사 등록하기"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="row">
                <ImageForm imgUrl={formInfo.resources} getImgUrl={getImgUrl} />
                <EventInfoForm
                  eventInfo={formInfo}
                  getFormInfo={getFormInfo}
                  initTime={time}
                />
              </div>

              <Curation
                curationInfo={curationInfo}
                getCurationInfo={getCurationInfo}
              />

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">상세정보</div>
                </div>

                <Editor more_information={detail} getDetail={getDetail} />
              </div>

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">관련 영상 업로드</div>
                </div>
                <div className="list-group-item">
                  <VideoAddForm getVideo={getVideo} />
                </div>
                <div className="row card-group-row">
                  {videos.map((video) => (
                    <VideoListItem vId={getVideoId(video.url)} key={video.id} />
                  ))}
                </div>
              </div>

              <div className="detail_under_menu ">
                <div className="card">
                  <PostSaveBtn
                    options={options}
                    onSubmitEvent={onSubmitEvent}
                    state={formInfo.state}
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
