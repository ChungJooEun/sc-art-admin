import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import GlobalBar from "../basic-components/GlobalBar";
import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import EditorTest from "../basic-components/editor-components/EditorTest";
import VideoAddFormTest from "../basic-components/video-components/VideoAddFormTest";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";
import ImageFormTest from "../basic-components/ImageFormTest";
import PostCodeModal from "../basic-components/PostCodeModal";
import EventInfoFormTest from "./add-form-components/EventInfoFormTest";
import CurationTest from "./add-form-components/CurationTest";
import RejectSection from "../basic-components/RejectSection";

const convertToDate = (str) => {
  if (str === null || str === undefined || str === "") {
    return new Date();
  }

  return new Date(
    parseInt(str.slice(0, 4)),
    parseInt(str.slice(4, 6)) - 1,
    parseInt(str.slice(6))
  );
};

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

const EventDetailView = ({ options, pagePathList, match }) => {
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

  const [formInfo, setFormInfo] = useState(null);
  const [openTime, setOpenTime] = useState("10:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [imgFile, setImgFile] = useState(null);
  const [curationInfo, setCurationInfo] = useState(null);
  const [detail, setDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [vId, setVId] = useState(1);

  const [rejectionReason, setRejectionReason] = useState(null);
  const [isApproved, setIsApproved] = useState(true);

  const history = useHistory();

  const onHandleSubmitEvent = () => {
    let formData = new FormData();

    formData.append("id", formInfo.id);
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
    formData.append("state", formInfo.state);
    formData.append("more_information", detail);
    formData.append("userid", window.sessionStorage.getItem("userid"));

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

    formData.append("festival_id", curationInfo.festival_id);

    // youtube
    vAry = new Array();
    for (let i = 0; i < videos.length; i++) {
      temp = new Object();
      temp.url = videos[i].url;
      vAry.push(temp);
    }
    formData.append("videos", JSON.stringify(vAry));

    // 거절 사유
    formData.append("rejection_reason", rejectionReason.code);
    formData.append("rejection_reason_text", rejectionReason.text);

    for (let key of formData.keys()) {
      console.log(key);
    }

    for (let v of formData.values()) console.log(v);

    postEvent(formData);
  };

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
        alert("수정되었습니다.");
        history.goBack();
      }
    } catch (e) {
      alert("수정중, 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onSubmitEvent = useConfirm(
    "수정 사항을 저장하시겠습니까?",
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

    if (dataName === "state") {
      if (data === "REJECT" || data === "WAIT") {
        setIsApproved(false);
      } else {
        setIsApproved(true);
      }
    }
  };

  const getPeriod = (date1, date2) => {
    setFormInfo({
      ...formInfo,
      open_date: date1,
      close_date: date2,
    });
  };

  const getCurationInfo = (dataName, data) => {
    setCurationInfo({
      ...curationInfo,
      [dataName]: data,
    });
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

  const onHandleRemoveEvent = () => {
    removeEventPost();
  };

  const removeEventPost = async () => {
    const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-event/${formInfo.id}`;
    try {
      const res = await axios.delete(url);

      if (res.status === 200) {
        alert("삭제되었습니다.");
        history.push("/event/event-manage");
      }
    } catch (e) {
      alert("삭제중 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onClickRemoveBtn = useConfirm(
    "삭제하시겠습니까?\n삭제된 문화행사는 되돌릴 수 없습니다.",
    onHandleRemoveEvent
  );

  const getRejectionReason = (dataName, data) => {
    setRejectionReason({
      ...rejectionReason,
      [dataName]: data,
    });
  };

  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    const getEventDetail = async () => {
      const { id } = match.params;
      const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-event/detail/${id}`;

      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setFormInfo({
            id: response.data.id,
            name: response.data.name,
            location: response.data.location,
            address1: response.data.address1,
            address2: response.data.address2,
            open_date: convertToDate(response.data.open_date),
            close_date: convertToDate(response.data.close_date),
            age: response.data.age,
            homepage: response.data.homepage,
            reservation_site: response.data.reservation_site,
            phone: response.data.phone,
            price: response.data.price,
            state: response.data.state,
          });

          // 큐레이션 정보
          setCurationInfo({
            event_type: response.data.event_type,
            event_theme: response.data.event_theme.includes(",")
              ? response.data.event_theme.replace(/"/gi, "").split(",")
              : [response.data.event_theme.replace(/"/gi, "")],
            event_field: response.data.event_field.includes(",")
              ? response.data.event_field.replace(/"/gi, "").split(",")
              : [response.data.event_field.replace(/"/gi, "")],
            festival_id: response.data.festival_id,
            festival_name: response.data.festival_name,
          });

          // 상세조회
          setDetail(response.data.more_information);

          setOpenTime(response.data.open_time);
          setCloseTime(response.data.close_time);

          // 비디오 목록 파싱
          let ary = [];

          // let vAry = [];
          // for (let i = 0; i < ary.length; i++) {
          //   if (ary[i].includes("https://www.youtube.com")) {
          //     vAry.push({
          //       vId: id++,
          //       url: ary[i],
          //     });
          //   }
          // }
          // setVideos(vAry);

          let id = 1;
          if (Object.keys(response.data.resources).includes("videos")) {
            for (let i = 0; i < response.data.resources.videos.length; i++) {
              ary.push({
                url: response.data.resources.videos[i].url,
                vId: id++,
              });
            }
          }
          setVideos(ary);
          setVId(id);

          // 이미지
          if (Object.keys(response.data).includes("images")) {
            ary = response.data.images.split('"');
            for (let i = 0; i < ary.length; i++) {
              if (ary[i].includes("/images/")) {
                setImgFile(ary[i]);
              }
            }
          } else if (Object.keys(response.data.resources).includes("images")) {
            setImgFile(response.data.resources.images[0].url);
          } else {
            setImgFile(null);
          }

          // 거절
          setRejectionReason({
            code:
              response.data.rejection_reason === ""
                ? "INSUFFICIENT"
                : response.data.rejection_reason,
            text: response.data.rejection_reason_text,
          });

          if (
            response.data.state === "WAIT" ||
            response.data.state === "REJECT"
          ) {
            setIsApproved(false);
          }

          console.log("====== 성공 ======");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getEventDetail();

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
  }, [match.params]);

  if (formInfo === null || curationInfo === null || rejectionReason === null) {
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
                <ImageFormTest imgSrc={imgFile} getImgFile={getImgFile} />
                <EventInfoFormTest
                  formInfo={formInfo}
                  getFormInfo={getFormInfo}
                  getPeriod={getPeriod}
                  open_time={openTime}
                  close_time={closeTime}
                  getTimeInfo={getTimeInfo}
                  togglePostCodeModal={togglePostCodeModal}
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
                    onClickRemoveBtn={onClickRemoveBtn}
                    showDelBtn={true}
                    getFormInfo={getFormInfo}
                  />
                  {isApproved ? (
                    ""
                  ) : (
                    <RejectSection
                      rejectionReason={rejectionReason}
                      getRejectionReason={getRejectionReason}
                    />
                  )}
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
