import React, { useEffect, useState, useCallback } from "react";
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
import UserReviewItem from "../basic-components/user-review-components/UserReviewItem";
import ReviewPaging from "../basic-components/user-review-components/ReviewPaging";

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

const PlaceDetailView = ({ options, match }) => {
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
  const [rejectionReason, setRejectionReason] = useState(null);
  const [isApproved, setIsApproved] = useState(true);

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
        alert("수정되었습니다.");
        history.push("/place/place-manage");
      }
    } catch (e) {
      alert("수정 중, 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onHandleSubmitPlace = () => {
    let formData = new FormData();

    if (imgFile) {
      formData.append("file", imgFile[0]);
    }
    formData.append("id", formInfo.id);
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

    // youtube
    let vAry = new Array();
    let temp;
    for (let i = 0; i < videos.length; i++) {
      temp = new Object();
      temp.url = videos[i].url;
      vAry.push(temp);
    }
    formData.append("videos", JSON.stringify(vAry));

    // 거절 사유
    formData.append("rejection_reason", rejectionReason.code);
    formData.append("rejection_reason_text", rejectionReason.text);

    postPlace(formData);
  };

  const onSubmitPlace = useConfirm(
    "수정 사항을 저장하시겠습니까?",
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

  const onHandleDelete = () => {
    removeEventPost();
  };

  const removeEventPost = async () => {
    const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-space/${formInfo.id}`;

    try {
      const res = await axios.delete(url);

      if (res.status === 200) {
        alert("삭제되었습니다.");
        history.push("/place/place-manage");
      }
    } catch (e) {
      alert("삭제 중, 오류가 발생하였습니다.");
      console.log(e);
    }
  };

  const onClickRemoveBtn = useConfirm(
    "삭제하시겠습니까?\n삭제된 문화공간은 다시 되돌릴 수 없습니다.",
    onHandleDelete
  );

  const getRejectionReason = (dataName, data) => {
    setRejectionReason({
      ...rejectionReason,
      [dataName]: data,
    });
  };

  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewList, setReviewList] = useState([]);

  const [curPage, setCurPage] = useState(1);
  const getCurPage = (pageNum) => {
    setCurPage(pageNum);
  };

  const getReviewList = useCallback(
    async (id) => {
      const url = `https://culture.seocho.go.kr:8443/user-service/api/admin/review/space/${id}`;

      try {
        const res = await axios.get(url, {
          params: {
            page: curPage,
            rows: 3,
          },
        });

        if (res.status === 200) {
          const { totalRows, data } = res.data;

          setTotalReviews(totalRows);

          let ary = [];
          for (let i = 0; i < data.length; i++) {
            ary.push({
              id: data[i].id,
              user: data[i].createUid,
              date: data[i].reviewDate,
              content: data[i].content,
              stars: data[i].score,
            });
          }

          setReviewList(ary);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [curPage]
  );

  const deleteReview = async (rId) => {
    const url = `https://culture.seocho.go.kr:8443/user-service/api/admin/review/${rId}`;

    try {
      const res = await axios.delete(url);

      if (res.status === 200) {
        getReviewList(match.params.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    const { id } = match.params;

    const getPlaceDetail = async () => {
      const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-space/detail/${id}`;

      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setFormInfo({
            id: response.data.id,
            name: response.data.name,
            address1: response.data.address1,
            address2: response.data.address2,
            homepage: response.data.homepage,
            phone: response.data.phone,
            holiday: response.data.holiday,
            state: response.data.state,
            space_type: response.data.space_type,
            space_type_name: response.data.space_type_name,
            averageScore: response.data.averageScore,
            viewCount: response.data.viewCount,
          });

          // 상세조회
          setDetail(response.data.more_information);

          setOpenTime(response.data.open_time);
          setCloseTime(response.data.close_time);

          //관련 동영상 파싱
          let ary = [];
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

          setImgFile(
            Object.keys(response.data.resources).includes("images")
              ? response.data.resources.images[0].url
              : null
          );

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

          // console.log("====== 성공 ======");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getPlaceDetail();
    getReviewList(id);

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
  }, [match.params, getReviewList]);

  if (formInfo === null) {
    return (
      // <div className="preloader">
      //   <div className="sk-chase">
      //     <div className="sk-chase-dot"></div>
      //     <div className="sk-chase-dot"></div>
      //     <div className="sk-chase-dot"></div>
      //     <div className="sk-chase-dot"></div>
      //     <div className="sk-chase-dot"></div>
      //     <div className="sk-chase-dot"></div>
      //   </div>
      // </div>
      <></>
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
                <div className="border-bottom-2 py-32pt position-relative z-1">
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

                <div className="container-fluid page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
                  <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
                    <div className="mb-24pt mb-sm-0 mr-sm-24pt mt-24pt">
                      <h2 className="">리뷰({totalReviews})</h2>
                    </div>
                  </div>

                  <div className="row" role="tablist">
                    <div className="col-auto d-flex flex-column">
                      <h6 className="m-0">
                        {formInfo.averageScore ? formInfo.averageScore : "0.0"}
                      </h6>
                      <p className="text-50 mb-0 d-flex align-items-center">
                        총 평점
                      </p>
                    </div>
                    <div className="col-auto border-left">
                      <h6 className="m-0">{formInfo.viewCount}</h6>
                      <p className="text-50 mb-0 d-flex align-items-center">
                        클릭 수
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="list-group bg-white list-group-flush flex-shrink-0"
                  style={{ position: "relative", zIndex: "0" }}
                >
                  {reviewList.map((reviewInfo) => (
                    <UserReviewItem
                      reviewInfo={reviewInfo}
                      deleteReview={deleteReview}
                      key={reviewInfo.id}
                    />
                  ))}
                </div>
                {totalReviews === 0 ? null : (
                  <ReviewPaging
                    curPage={curPage}
                    getCurPage={getCurPage}
                    onePage={3}
                    all={totalReviews}
                  />
                )}
              </div>

              <div className="detail_under_menu ">
                <div className="card">
                  <PostSaveBtn
                    options={options}
                    onSubmitEvent={onSubmitPlace}
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

export default PlaceDetailView;
