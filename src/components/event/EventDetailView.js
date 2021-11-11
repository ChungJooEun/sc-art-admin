import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import GlobalBar from "../basic-components/GlobalBar";
import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import Editor from "../basic-components/editor-components/Editor";
import VideoAddForm from "../basic-components/video-components/VideoAddForm";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";
import ImageForm from "../basic-components/ImageForm";

import EventInfoForm from "./add-form-components/EventInfoForm";
import Curation from "./add-form-components/Curation";
import RejectSection from "../basic-components/RejectSection";

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

const EventDetailView = ({ options, isApproved, match }) => {
  const [loading, setLoading] = useState(true);

  const getVideoId = (url) => {
    let videoId;

    if (url.indexOf("watch?v=") === 24) {
      videoId = url.slice(32, 43);
    } else {
      videoId = url.slice(17, 28);
    }

    return videoId;
  };

  const [formInfo, setFormInfo] = useState(null);
  const getFormInfo = useCallback(
    (result) => {
      setFormInfo({
        ...formInfo,
        result,
      });
    },
    [formInfo]
  );

  const [curationInfo, setCurationInfo] = useState(null);
  const getCurationInfo = useCallback((info) => {
    setCurationInfo(info);
  }, []);

  const [detail, setDetail] = useState("");
  const getDetail = useCallback((result) => {
    setDetail(result);
  }, []);

  const [vId, setVid] = useState(null);
  const [videos, setVideos] = useState(null);
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

  const getImgUrl = useCallback(
    (imgFile) => {
      setFormInfo({
        ...formInfo,
        resources: imgFile,
      });
    },
    [formInfo]
  );

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
        // window.location.href = "/event/event-manage";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitEvent = (formState) => {
    let formData = new FormData();

    if (formInfo.resources) {
      formData.append(
        "file",
        formInfo.resources[0],
        formInfo.resources[0].name
      );
    }

    formData.append("name", formInfo.name);
    formData.append("location", formInfo.location);
    formData.append("address1", formInfo.adderss1);
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

    // youtube
    vAry = new Array();
    for (let i = 0; i < videos.length; i++) {
      temp = new Object();
      temp.url = videos[i].url;
      vAry.push(temp);
    }
    formData.append("videos", vAry);

    postEvent(formData);
  };

  useEffect(() => {
    const srcList = [
      "/assets/vendor/jquery.min.js",
      "/assets/vendor/popper.min.js",
      "/assets/vendor/bootstrap.min.js",
      "/assets/vendor/perfect-scrollbar.min.js",
      "/assets/vendor/dom-factory.js",
      "/assets/vendor/material-design-kit.js",
      "/assets/js/app.js",
      "/assets/js/hljs.js",
      "/assets/js/settings.js",
      "/assets/vendor/moment.min.js",
      "/assets/vendor/moment-range.js",
      "/assets/vendor/Chart.min.js",
      "/assets/js/chartjs.js",
      "/assets/js/chartjs-rounded-bar.js",
      "/assets/js/page.projects.js",
      "/assets/js/page.analytics-2-dashboard.js",
      "/assets/vendor/list.min.js",
      "/assets/js/list.js",
      "/assets/js/toggle-check-all.js",
      "/assets/js/check-selected-row.js",
      "/assets/js/app-settings.js",
    ];
    let scriptList = [];

    for (let i = 0; i < srcList.length; i++) {
      const script = document.createElement("script");
      script.src = process.env.PUBLIC_URL + srcList[i];
      scriptList.push(script);
      document.body.appendChild(script);
    }

    const getEventDetail = async () => {
      const { id } = match.params;
      const url = `/api/admin/cultural-event/detail/${id}`;

      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setCurationInfo(response.data);
          setDetail(response.data.more_information);
          setFormInfo(response.data);

          setVid(response.data.videos.length);

          let ary = [];
          for (let i = 0; i < response.data.videos.length; i++) {
            ary.concat({
              vId: i,
              url: response.data.videos[i].url,
            });
          }
          setVideos(ary);

          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getEventDetail();

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, [match.params]);

  if (loading) {
    return <p>로딩중..</p>;
  }

  if (!formInfo || !curationInfo || !detail || !videos) {
    return <p>fail to loading data</p>;
  }

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
                <ImageForm
                  imgUrl={formInfo.resources.image[0].url}
                  getImgUrl={getImgUrl}
                />
                <EventInfoForm eventInfo={formInfo} getFormInfo={getFormInfo} />
              </div>

              <Curation
                curationInfo={curationInfo}
                getCurationInfo={getCurationInfo}
              />

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">상세정보</div>
                </div>

                <Editor mor_information={detail} getDetail={getDetail} />
              </div>

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">관련 영상 업로드</div>
                </div>
                <div className="list-group-item">
                  <VideoAddForm getVideo={getVideo} />
                </div>
                <div className="row card-group-row">
                  {videos.videos.map((video) => (
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
                  {isApproved ? "" : <RejectSection />}
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

export default EventDetailView;
