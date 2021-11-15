import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";
import ScModal from "./sc-event-components/ScModal";
import EditorTest from "../basic-components/editor-components/EditorTest";

// import ScheduleList from "./sc-event-components/ScheduleList";
import CheckableEventList from "./event-components/CheckableEventList";
import Paging from "../basic-components/Paging";
import PostSaveBtn from "../basic-components/PostSaveBtn";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/event/event-manage",
    pageName: "문화 행사",
  },

  {
    pageUrl: "/event/seocho-festival",
    pageName: "서초 축제",
  },
];

const convertDateFormat = (date) => {
  return "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
};

const convertToDate = (str) => {
  if (str === null || str === undefined) {
    return new Date();
  }

  return new Date(
    parseInt(str.slice(0, 4)),
    parseInt(str.slice(4, 6)) - 1,
    parseInt(str.slice(6))
  );
};
const count = 5;

const addPostOptions = [
  { value: "TEMP_SAVE", name: "임시 저장" },
  { value: "POST", name: "게시" },
  { value: "CLOSED", name: "비공개" },
];

const ScFestivalDetailView = ({ match }) => {
  const onChangeImgFile = (e) => {
    const imgFileAry = e.target.files;

    setImgBase64([]);
    setBannerImg(imgFileAry);

    for (let i = 0; i < imgFileAry.length; i++) {
      if (imgFileAry[i]) {
        let reader = new FileReader();

        // 1. 파일 읽어서 버퍼에 저장
        reader.readAsDataURL(imgFileAry[i]);

        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 읽기 완료시, 아래 코드 실행
          const base64 = reader.result;

          if (base64) {
            var base64Sub = base64.toString();

            // 파일 base64 상태 업데이트
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangePeriod = (item) => {
    setPeriod({
      startDate: item["selection"].startDate,
      endDate: item["selection"].endDate,
      key: item["selection"].key,
    });
  };

  const getDescription = (e) => {
    setDescription(e.target.value);
  };

  const getmoreInformation = useCallback((result) => {
    setMoreInformation(result);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const toggleScModal = () => {
    setShowModal(!showModal);
  };

  const getEventList = (list) => {
    if (eventList.length === 0) {
      setEventList(list);
      return;
    }

    let ary = list;
    // 기존의 리스트 돌면서 해당하는 event id가 있는지 검사
    for (let i = 0; i < eventList.length; i++) {
      ary = ary.filter((item) => item.id !== eventList[i].id);
    }
    setEventList(eventList.concat(ary));

    return;
  };
  const removeEventList = () => {
    let ary = eventList;
    for (let i = 0; i < checkedList.length; i++) {
      ary = ary.filter((item) => item.id !== checkedList[i].id);
    }

    setEventList(ary);
    setCheckedList([]);
  };
  const showEventList = () => {
    return eventList.slice((pageNumber - 1) * count, pageNumber * count);
  };

  const [checkedList, setCheckedList] = useState([]);
  const addCheckedList = (eventInfo) => {
    setCheckedList(checkedList.concat(eventInfo));
  };
  const removeNoneCheckedList = (rId) => {
    let ary = checkedList;
    ary = ary.filter((item) => item.id !== rId);

    setCheckedList(ary);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const getPageNumber = (curNumber) => {
    setPageNumber(curNumber);
  };

  const [id, setId] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [imgBase64, setImgBase64] = useState([]);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState({
    startDate: "",
    endDate: "",
    key: "selection",
  });
  const [description, setDescription] = useState("");
  const [moreInformation, setMoreInformation] = useState("");
  const [eventList, setEventList] = useState([]);
  const [postState, setPostState] = useState("");
  // 게시
  const history = useHistory();
  const postScEvent = async (data) => {
    const url = "/api/admin/seochogu-festival/regist";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, data, config);

      if (response.status === 200) {
        console.log(response.data);
        history.push("/event/seocho-festival");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitPost = (state) => {
    const data = new FormData();

    // 배너 이미지
    console.log(bannerImg);
    if (bannerImg) data.append("file", bannerImg[0]);

    // id
    if (id !== null) data.append("id", id);

    // 제목
    data.append("name", title);

    // 시작일, 마감일
    data.append("open_date", convertDateFormat(period["selection"].startDate));
    data.append("close_date", convertDateFormat(period["selection"].endDate));

    // 설명
    data.append("description", description);

    data.append("is_schedule_displayed", 0);
    data.append("is_posted", 1);
    data.append("last_event_added", "20211113");

    // 상세정보
    data.append("more_information", moreInformation);

    // 관련 행사
    for (let i = 0; i < eventList.length; i++) {
      data.append("related_event_list", eventList[i].id);
    }

    // 상태
    data.append("state", state);

    //
    data.append("userid", "admin");

    postScEvent(data);
  };

  const getImgSrc = () => {
    if (imgBase64.length === 1) {
      return imgBase64[0];
    } else if (bannerImg) {
      return `http://localhost:3000${bannerImg}`;
    } else {
      return "/assets/images/256_rsz_thomas-russell-751613-unsplash.jpg";
    }
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

    const getScFestivalInfo = async () => {
      const { id } = match.params;
      const url = `/api/admin/seochogu-festival/detail/${id}`;

      const res = await axios.get(url);

      if (res.status === 200) {
        console.log(res.data);

        if (res.data.resources) {
          // 배너 이미지
          let ary = JSON.stringify(res.data.resources).split('"');
          for (let i = 0; i < ary.length; i++) {
            if (ary[i].includes("/images/")) {
              setBannerImg(ary[i]);
            }
          }
        }

        // id
        setId(res.data.id);

        // 제목
        setTitle(res.data.name);

        // 기간
        setPeriod({
          startDate: convertToDate(res.data.open_date),
          endDate: convertToDate(res.data.close_date),
          key: "selection",
        });

        // 설명
        setDescription(res.data.description);

        // 상세정보
        setMoreInformation(res.data.more_information);

        console.log(typeof res.data.related_event_list2);

        // 관련행사
        setEventList(res.data.related_event_list2);
      }

      if (res.data.state === undefined) {
        setPostState("");
      } else setPostState(res.data.state);
    };

    getScFestivalInfo();
    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, []);

  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <GlobalBar />
        {showModal ? (
          <ScModal closeModal={toggleScModal} getEventList={getEventList} />
        ) : null}
        <PageTitle
          pageTitle="새로운 축제 등록하기"
          pagePathList={pagePathList}
        />

        <div className="container-fluid page__container">
          {/* form info */}
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">배너</div>
            </div>
            <div className="list-group">
              <div className="list-group-item">
                <div
                  role="group"
                  aria-labelledby="label-question"
                  className="m-0 form-group"
                >
                  {/* 배너 이미지 */}
                  <div className="form-row">
                    <div className="flex" style={{ maxWidth: "100%" }}>
                      <img
                        src={getImgSrc()}
                        className="avatar-img rounded"
                        alt=""
                        data-dz-thumbnail
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-group-item">
                <div
                  role="group"
                  aria-labelledby="label-question"
                  className="m-0 form-group"
                >
                  <div className="form-row align-items-center">
                    <label
                      id="label-question"
                      htmlFor="question"
                      className="col-md-2 col-form-label form-label"
                    >
                      이미지
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept="image/*"
                        className=""
                        id="customFileUploadMultiple"
                        onChange={(e) => onChangeImgFile(e)}
                      />
                      <label
                        className=""
                        htmlFor="customFileUploadMultiple"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              {/* 제목 */}
              <div className="list-group-item">
                <div
                  role="group"
                  aria-labelledby="label-question"
                  className="m-0 form-group"
                >
                  <div className="form-row align-items-center">
                    <label
                      id="label-question"
                      htmlFor="question"
                      className="col-md-2 col-form-label form-label"
                    >
                      제목
                    </label>
                    <div className="col-md-10">
                      <input
                        id="title"
                        type="text"
                        placeholder="제목을 입력하세요 ..."
                        className="form-control"
                        value={title}
                        onChange={(e) => {
                          onChangeTitle(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* 기간 */}
              <div className="list-group-item">
                <div className="form-group row align-items-center mb-0">
                  <label
                    id="label-question"
                    htmlFor="question"
                    className="col-md-2 col-form-label form-label"
                  >
                    기간
                  </label>
                  <div className="col-md-7">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => onChangePeriod(item)}
                      moveRangeOnFirstSelection={false}
                      ranges={[period]}
                      direction="horizontal"
                      locale={locales["ko"]}
                      weekStartsOn={1}
                      months={2}
                      monthDisplayFormat="yyyy년 MM월"
                      dateDisplayFormat="yyyy년 MM월 dd일"
                    />
                  </div>
                </div>
              </div>
              {/* 설명 */}
              <div className="list-group-item">
                <div
                  role="group"
                  aria-labelledby="label-question"
                  className="m-0 form-group"
                >
                  <div className="form-row">
                    <label
                      id="label-question"
                      htmlFor="question"
                      className="col-md-2 col-form-label form-label"
                    >
                      설명
                    </label>
                    <div className="col-md-10">
                      <textarea
                        id="question"
                        placeholder="설명을 입력하세요..."
                        rows="4"
                        className="form-control"
                        value={description}
                        onChange={(e) => getDescription(e)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 상세정보 에디터 */}
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">상세정보</div>
            </div>
            <EditorTest
              getDetail={getmoreInformation}
              more_information={moreInformation}
            />
          </div>

          {/* 관련행사 */}
          <div className="page-section">
            <div className="page-separator">
              <div className="page-separator__text">관련행사</div>
            </div>
            <div
              className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
              id="default-navbar"
              data-primary=""
            >
              <button
                className="btn btn-primary modal-btn"
                onClick={() => toggleScModal()}
              >
                가져오기
              </button>
              <div className="flex"></div>
              <button
                className="btn btn-warning ml-16pt"
                data-toggle="swal"
                data-swal-title="정말 이 축제에서 제거 하시겠습니까??"
                data-swal-text="이 동작은 다시 되돌릴 수 없습니다."
                data-swal-type="warning"
                data-swal-show-cancel-button="true"
                data-swal-confirm-button-text="확인"
                data-swal-confirm-cb="#swal-confirm-delete"
                data-swal-close-on-confirm="false"
                onClick={() => removeEventList()}
              >
                제거
              </button>
              <div
                id="swal-confirm-delete"
                className="d-none"
                data-swal-type="success"
                data-swal-title="제거완료"
                data-swal-text="제거 완료되었습니다."
              ></div>
            </div>
            <div className="card dashboard-area-tabs mb-32pt">
              <div className="card-header">
                <form className="form-inline">
                  <label
                    className="mr-sm-2 form-label"
                    htmlFor="inlineFormFilterBy"
                  >
                    총 {eventList.length}건
                  </label>
                </form>
              </div>
              <div
                className="table-responsive"
                data-toggle="lists"
                data-lists-sort-by="js-lists-values-date"
                data-lists-sort-desc="true"
                data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
              >
                <CheckableEventList
                  list={showEventList()}
                  pageNumber={pageNumber}
                  count={count}
                  addCheckedList={addCheckedList}
                  removeNoneCheckedList={removeNoneCheckedList}
                />
                <Paging
                  pageNumber={pageNumber}
                  getPageNumber={getPageNumber}
                  totalNum={eventList.length}
                  count={count}
                />
              </div>
            </div>
          </div>

          {/* 스케줄 확인 */}
          {/* <div className="page-section section-sc-fe">
            <div className="page-separator">
              <div className="page-separator__text">스케줄 확인</div>
            </div>
            <div className="row card-group-row mb-lg-8pt">
              {drawScheduleList()}
            </div>
          </div> */}
          <div className="detail_under_menu ">
            <div className="card">
              <PostSaveBtn
                options={addPostOptions}
                onSubmitEvent={onSubmitPost}
                state={postState}
              />
            </div>
          </div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};

export default ScFestivalDetailView;
