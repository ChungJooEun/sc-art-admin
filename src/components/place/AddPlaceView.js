import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import SideMenuBar from "../basic-components/SideMenuBar";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import ImageForm from "../basic-components/ImageForm";

import PlaceInfoForm from "./add-form-components/PlaceInfoForm";
import Editor from "../basic-components/editor-components/Editor";
import VideoAddForm from "../basic-components/video-components/VideoAddForm";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";

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

const AddPlaceView = ({ options }) => {
  const history = useHistory();

  const [formInfo, setFormInfo] = useState({
    name: "",
    location: "",
    address1: "",
    address2: "",
    homepage: "",
    phone: "",
    price: "",
    resources: null,
    state: "TEMP_SAVE",
    space_type: "HALL",
  });
  const [time, setTime] = useState({
    open_time: "9:00",
    close_time: "21:00",
  });
  const getFormInfo = useCallback((result, time) => {
    setFormInfo(result);
    setTime(time);
  }, []);
  const onChangePlaceType = (e) => {
    setFormInfo({
      ...formInfo,
      space_type: e.target.value,
    });
  };

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

  const postPlace = async (placeData) => {
    const url = "/api/admin/cultural-space/regist";

    try {
      const response = await axios.post(url, placeData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(response.status);
      if (response.status === 200) {
        console.log(response.data);
        // history.push("/event/event-manage");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitEvent = (formState) => {
    let formData = new FormData();

    if (formInfo.resources !== null) {
      formData.append("files", formInfo.resources[0]);
    }

    formData.append("name", formInfo.name);
    formData.append("location", formInfo.location);
    formData.append("address1", formInfo.address1);
    formData.append("address2", formInfo.address2);
    formData.append("homepage", formInfo.homepage);
    formData.append("phone", formInfo.phone);
    formData.append("price", formInfo.price);
    formData.append("open_time", time.open_time);
    formData.append("close_time", time.close_time);
    formData.append("state", formState);
    formData.append("more_information", detail);
    formData.append("userid", "dowon.lee");
    formData.append("event_type", formInfo.event_type);

    // youtube
    for (let i = 0; i < videos.length; i++) {
      formData.append("videos", JSON.stringify({ url: videos[i].url }));
    }

    postPlace(formData);
  };

  useEffect(() => {
    const srcList = [
      `${process.env.PUBLIC_URL}/assets/vendor/perfect-scrollbar.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/dom-factory.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/material-design-kit.js`,
      `${process.env.PUBLIC_URL}/assets/js/app.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/jquery.min.js`,
      `${process.env.PUBLIC_URL}/assets/js/hljs.js`,
      `${process.env.PUBLIC_URL}/assets/js/settings.js`,
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
            pageTitle="문화공간 등록하기"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="row">
                <ImageForm imgUrl={formInfo.resources} getImgUrl={getImgUrl} />
                <PlaceInfoForm
                  placeInfo={formInfo}
                  getFormInfo={getFormInfo}
                  initTime={time}
                />
              </div>
              <div className="page-section">
                <div className="form-group">
                  <label className="form-label" htmlFor="select01">
                    종류
                  </label>
                  <select
                    id="custom-select"
                    className="form-control custom-select"
                    value={formInfo.space_type}
                    onChange={(e) => {
                      onChangePlaceType(e);
                    }}
                  >
                    <option value="HALL">공연장</option>
                    <option value="PRACTICE">연습실</option>
                    <option value="INSTRUMENT">악기상점</option>
                    <option value="GALLERY">갤러리</option>
                  </select>
                </div>
              </div>
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

export default AddPlaceView;
