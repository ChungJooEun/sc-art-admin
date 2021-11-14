import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import SideMenuBar from "../basic-components/SideMenuBar";
import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import ImageFormTest from "../basic-components/ImageFormTest";
import PostCodeModal from "../basic-components/PostCodeModal";

import PlaceInfoForm from "./add-form-components/PlaceInfoForm";
import EditorTest from "../basic-components/editor-components/EditorTest";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";
import VideoAddFormTest from "../basic-components/video-components/VideoAddFormTest";
import RejectSection from "../basic-components/RejectSection";

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

const PlaceDetailView = ({ options, isApproved, match }) => {
  const history = useHistory();

  const [formInfo, setFormInfo] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [openTime, setOpenTime] = useState("10:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [detail, setDetail] = useState("");
  const [videos, setVideos] = useState([]);
  const [vId, setVId] = useState(1);
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
        history.push("/place/place-manage");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitEvent = (formState) => {
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
    // formData.append("price", formInfo.price);
    formData.append("open_time", openTime);
    formData.append("close_time", closeTime);
    formData.append("state", formState);
    formData.append("more_information", detail);
    formData.append("userid", window.sessionStorage.getItem("userid"));
    formData.append("space_type", formInfo.space_type);

    // youtube
    for (let i = 0; i < videos.length; i++) {
      formData.append("videos", JSON.stringify({ url: videos[i].url }));
    }

    postPlace(formData);
  };

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

    const getPlaceDetail = async () => {
      const { id } = match.params;
      const url = `/api/admin/cultural-space/detail/${id}`;

      try {
        const response = await axios.get(url);

        console.log(response.data);

        if (response.status === 200) {
          setFormInfo({
            name: response.data.name,
            address1: response.data.address1,
            address2: response.data.address2,
            homepage: response.data.homepage,
            phone: response.data.phone,
            holiday: "",
            state: response.data.state,
            space_type: response.data.space_type,
            space_type_name: response.data.space_type_name,
          });

          // 상세조회
          setDetail(response.data.more_information);

          setOpenTime(response.data.open_time);
          setCloseTime(response.data.close_time);

          let ary = response.data.resources.split('"');
          let id = 1;

          let vAry = [];

          for (let i = 0; i < ary.length; i++) {
            if (ary[i].includes("/images/")) {
              setImgFile(ary[i]);
            } else if (ary[i].includes("https://www.youtube.com")) {
              vAry.push({
                vId: id++,
                url: ary[i],
              });
            }
          }
          setVideos(vAry);
          setVId(id);

          setLoading(false);

          console.log("====== 성공 ======");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getPlaceDetail();

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, [match.params]);

  if (loading) {
    return <p>로딩중..</p>;
  }

  if (!formInfo || !detail) {
    return <p>fail to loading data</p>;
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
            pageTitle="문화공간 등록하기"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="row">
                <ImageFormTest imgSrc={imgFile} getImgFile={getImgFile} />
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
                    defaultValue={getDefaultOptions_category(
                      formInfo.space_type
                    )}
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
                      vId={getVideoId(video.url)}
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

export default PlaceDetailView;
