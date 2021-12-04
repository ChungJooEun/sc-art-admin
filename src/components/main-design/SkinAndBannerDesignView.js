import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MenuContext from "../../context/menu";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

import MainBanner from "./skin-banner-design-components/MainBanner";
import NoticeAndEventBanner from "./skin-banner-design-components/NoticeAndEventBanner";
import VideoManagement from "./skin-banner-design-components/VideoManagement";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/main-design/skin-and-banner-design",
    pageName: "메인디자인 관리",
  },
];

const SkinAndBannerDesignView = () => {
  // 메인 베너 -> base64
  const [mainBanner, setMainBanner] = useState(null);

  // 공지사항/이벤트 배너
  const [noticeAndEventBanner, setNoticeAndEventBanner] = useState([]);
  const [initialNoticeEvent, setInitialNoticeEvent] = useState([]);

  const [noticeBannerId, setNoticeBannerId] = useState(0);

  // 서리풀 청년 아트 갤러리
  const [artGalleryVideos, setArtGalleryVideos] = useState([]);
  const [initialArtGalleryVideos, setInitialArtGalleryVideos] = useState([]);
  // 서리풀 악기거리
  const [instrumentStreetVideos, setInstrumentStreetVideos] = useState([]);
  const [initialInstrumentStreetVideos, setInitialInstrumentStreetVideos] =
    useState([]);
  // 서초 금요 음악회
  const [fridayConcertVideos, setFridayConcertVideos] = useState([]);
  const [initialFridayConcertVideos, setInitialFridayConcertVideosList] =
    useState([]);
  // 서초 실내악 축제
  const [chamverMusicVideos, setChamverMusicVidoes] = useState([]);
  const [initialChamverMusicVideos, setInitialChamverMusicVideos] = useState(
    []
  );

  const [vIdInfos, setvIdInfos] = useState({
    artId: 0,
    instrument: 0,
    concert: 0,
    chamver: 0,
  });

  // 메인 베너 이미지 가져오기
  const getMainBannerImg = (imgBase64) => {
    setMainBanner(imgBase64);
  };

  // 공지사항 / 이벤트 배너 입력 정보 가져오기
  const getBannerInfo = (imgFile, link, imgBase64) => {
    setNoticeAndEventBanner(
      noticeAndEventBanner.concat({
        imgFile: imgFile,
        link: link,
        imgBase64: imgBase64,
        id: noticeBannerId,
      })
    );

    setNoticeBannerId(noticeBannerId + 1);
  };

  // 삭제 버튼 클릭시, db에서 삭제 요청 api
  const requestDelNoticeEventBanner = async (rId) => {
    const url = `http://118.67.154.134:22000/api/main/theme/${rId}`;
    // const url = `http://localhost:9200/api/main/theme/${rId}`;

    try {
      const res = await axios.delete(url);

      if (res.status === 200) {
        console.log(
          `===== success delete notice and event banner data : ${rId} =====`
        );
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 삭제 버튼 클릭시, 공지사항 / 이벤트 베너 삭제 요청
  const removeNoticeBanner = (rId) => {
    console.log(rId);
    // 삭제를 요청한 데이터가 초기 데이터인지 검사
    let ary;
    if (isInitalData_NoticeEvent(rId)) {
      ary = initialNoticeEvent;
      ary = ary.filter((item) => item.id !== rId);
      setInitialNoticeEvent(ary);
    } else {
      ary = noticeAndEventBanner;
      ary = ary.filter((item) => item.id !== rId);
      setNoticeAndEventBanner(ary);
    }
  };

  const isInitalData_NoticeEvent = (rId) => {
    let isInitialData = false;

    // 처음에 init한 data를 지우려는지 체크
    for (let i = 0; i < initialNoticeEvent.length; i++) {
      if (rId === initialNoticeEvent[i].id) {
        isInitialData = true;
        // 기존 데이터를 삭제 api 호출
        requestDelNoticeEventBanner(rId);
        break;
      }
    }

    return isInitialData;
  };

  // 동영상 관리 > 추가 버튼 눌렀을 시에 해당 리스트에 저장(id도 증가)
  const getVideoInfo = (url, type) => {
    switch (type) {
      case 0:
        setArtGalleryVideos(
          artGalleryVideos.concat({ vId: vIdInfos.artId, url: url })
        );
        setvIdInfos({
          ...vIdInfos,
          artId: vIdInfos.artId + 1,
        });
        break;
      case 1:
        setInstrumentStreetVideos(
          instrumentStreetVideos.concat({ vId: vIdInfos.instrument, url: url })
        );
        setvIdInfos({
          ...vIdInfos,
          instrument: vIdInfos.instrument + 1,
        });
        break;
      case 2:
        setFridayConcertVideos(
          fridayConcertVideos.concat({ vId: vIdInfos.concert, url: url })
        );
        setvIdInfos({
          ...vIdInfos,
          concert: vIdInfos.concert + 1,
        });
        break;
      case 3:
        setChamverMusicVidoes(
          chamverMusicVideos.concat({ vId: vIdInfos.chamver, url: url })
        );
        setvIdInfos({
          ...vIdInfos,
          chamver: vIdInfos.chamver + 1,
        });
        break;
      default:
        break;
    }
  };

  // 초기 initial data를 삭제시, db삭제 요청 api
  const requestDelVideo = async (rId) => {
    const url = `http://118.67.154.134:22000/api/main/theme/${rId}`;

    try {
      const res = await axios.delete(url);

      if (res === 200) {
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 배열과 삭제할 id를 받아 조건으로 삭제 후 return
  const removeAtList = (rId, list) => {
    let ary = list;

    ary = ary.filter((item) => item.vId !== rId);
    return ary;
  };

  // 삭제하려는 데이터가 초기 데이터이면 api 삭제 요청, true/false 반환
  const isInitalData = (rId, initialVideoList) => {
    let isInitialData = false;

    // 처음에 init한 data를 지우려는지 체크
    for (let i = 0; i < initialVideoList.length; i++) {
      if (rId === initialVideoList[i].vId) {
        isInitialData = true;
        // 기존 데이터를 삭제 api 호출
        requestDelVideo(rId);
        break;
      }
    }

    return isInitialData;
  };

  // 비디오 삭제 버튼 클릭시,
  const getRemoveVideoInfo = (rId, type) => {
    switch (type) {
      case 0:
        isInitalData(rId, initialArtGalleryVideos)
          ? setInitialArtGalleryVideos(
              removeAtList(rId, initialArtGalleryVideos)
            )
          : setArtGalleryVideos(removeAtList(rId, artGalleryVideos));
        break;
      case 1:
        isInitalData(rId, initialInstrumentStreetVideos)
          ? setInitialInstrumentStreetVideos(
              removeAtList(rId, initialInstrumentStreetVideos)
            )
          : setInstrumentStreetVideos(
              removeAtList(rId, instrumentStreetVideos)
            );
        break;
      case 2:
        isInitalData(rId, initialFridayConcertVideos)
          ? setInitialFridayConcertVideosList(
              removeAtList(rId, initialFridayConcertVideos)
            )
          : setFridayConcertVideos(removeAtList(rId, fridayConcertVideos));
        break;
      case 3:
        isInitalData(rId, initialChamverMusicVideos)
          ? setInitialChamverMusicVideos(
              removeAtList(rId, initialChamverMusicVideos)
            )
          : setChamverMusicVidoes(removeAtList(rId, chamverMusicVideos));
        break;
      default:
        break;
    }
  };

  // 저장 버튼 클릭
  const onClickSaveMainBtn = () => {
    const data = new FormData();

    //     main: 메인이미지, # 메인 배경
    data.append("mainFile", mainBanner[0]);

    //     등록자
    data.append("userid", window.sessionStorage.getItem("userid"));

    for (let key of data.keys()) {
      console.log("key : " + key);
    }

    for (let value of data.values()) {
      console.log("value : " + value);
    }

    saveMainDesignInfo(data);
  };

  // 메인 배경 저장 api
  const saveMainDesignInfo = async (data) => {
    const url = "http://118.67.154.134:9200/api/main/bg";

    try {
      const res = await axios.post(url, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log(" ==== seccess save main design data ====");
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 공지사항/이벤트 저장 버튼 클릭
  const onClickSaveNoticeEventBtn = () => {
    const data = new FormData();

    // file: 배너이미지, link: 링크주소
    for (let i = 0; i < noticeAndEventBanner.length; i++) {
      data.append("files", noticeAndEventBanner[i].imgFile[0]);
      data.append("links", noticeAndEventBanner[i].link);
    }

    //     등록자
    data.append("userid", window.sessionStorage.getItem("userid"));

    for (let key of data.keys()) {
      console.log("key : " + key);
    }

    for (let value of data.values()) {
      console.log("value : " + value);
    }

    saveNoticeEventInfo(data);
  };

  // 공지사항/이벤트 저장 api
  const saveNoticeEventInfo = async (data) => {
    const url = "http://118.67.154.134:9200/api/main/banners";

    try {
      const res = await axios.post(url, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log(" ==== seccess save main banner data ====");
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 비디오 저장 버튼 클릭
  const onClickSaveVideosBtn = () => {
    const data = new FormData();

    //     videos1: [{url}, …], # 서리플 청년 아트 갤러리
    for (let i = 0; i < artGalleryVideos.length; i++) {
      data.append("videos1", JSON.stringify({ url: artGalleryVideos[i].url }));
    }
    //     videos2: [{url}, …], # 서리풀 악기거리 (악기 아님, 오타)
    for (let i = 0; i < instrumentStreetVideos.length; i++) {
      data.append(
        "videos2",
        JSON.stringify({ url: instrumentStreetVideos[i].url })
      );
    }
    //     videos3: [{url}, …], # 서초 금요 음악회
    for (let i = 0; i < fridayConcertVideos.length; i++) {
      data.append(
        "videos3",
        JSON.stringify({ url: fridayConcertVideos[i].url })
      );
    }
    //     videos4: [{url}, …],  # 서초 실내악 축제
    for (let i = 0; i < chamverMusicVideos.length; i++) {
      data.append(
        "videos4",
        JSON.stringify({ url: chamverMusicVideos[i].url })
      );
    }

    //     등록자
    data.append("userid", window.sessionStorage.getItem("userid"));

    for (let key of data.keys()) {
      console.log("key : " + key);
    }

    for (let value of data.values()) {
      console.log("value : " + value);
    }

    saveVideosInfo(data);
  };

  // 비디오 저장 api
  const saveVideosInfo = async (data) => {
    const url = "http://118.67.154.134:9200/api/main/videos";

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        console.log(" ==== seccess save main videos data ====");
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const history = useHistory();
  const { actions } = useContext(MenuContext);
  useEffect(() => {
    let token = window.sessionStorage.getItem("token");

    if (!token || token === undefined) {
      history.push("/common/login");
    }

    // initial data 받아오기
    const getInitialData = async () => {
      const url = "http://118.67.154.134:22000/api/main/theme";
      // const url = "http://localhost:9000/api/main/theme";

      try {
        const res = await axios.get(url);

        if (res.status === 200) {
          let ary;

          const { main, banners, videos1, videos2, videos3, videos4 } =
            res.data;

          // 메인 배너
          setMainBanner(main);

          // 공지사항 & 이벤트 베너 초기화
          ary = [];
          for (let i = 0; i < banners.length; i++) {
            ary.push({
              imgFile: banners[i].image,
              link: banners[i].link,
              imgBase64: [],
              id: banners[i].id,
            });
          }
          setInitialNoticeEvent(ary);

          // 서리풀 청년 아트 갤러리
          ary = [];
          for (let i = 0; i < videos1.length; i++) {
            ary.push({ vId: videos1[i].id, url: videos1[i].video });
          }
          setInitialArtGalleryVideos(ary);

          // 서리풀 악기거리
          ary = [];
          for (let i = 0; i < videos2.length; i++) {
            ary.push({ vId: videos2[i].id, url: videos2[i].video });
          }
          setInitialInstrumentStreetVideos(ary);

          // 서초 금요 음악회
          ary = [];
          for (let i = 0; i < videos3.length; i++) {
            ary.push({ vId: videos3[i].id, url: videos3[i].video });
          }
          setInitialFridayConcertVideosList(ary);

          // 서초 실내악 축제
          ary = [];
          for (let i = 0; i < videos4.length; i++) {
            ary.push({ vId: videos4[i].id, url: videos4[i].video });
          }
          setInitialChamverMusicVideos(ary);
        }
      } catch (e) {
        console.log(e);
      }
    };

    // initial data는 해당 data의 Id 정보를 가지고 있음
    // 받아온 데이터를 기존의 데이터에 init, initailIdList에는 id 값을 추출하여 사용
    getInitialData();

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
      `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
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

    actions.setMenu({
      topMenu: 1,
      subMenu: 0,
    });

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
        <PageTitle
          pageTitle={"메인 배너/스킨 관리"}
          pagePathList={pagePathList}
        />

        <div className="container-fluid page__container">
          <MainBanner
            getMainBannerImg={getMainBannerImg}
            imgFile={mainBanner}
          />

          <div className="save-button">
            <button
              className="btn btn btn-secondary ml-16pt"
              onClick={() => history.push("/dashboard")}
            >
              취소
            </button>
            <button
              className="btn btn-success"
              data-toggle="swal"
              data-swal-title="완료!"
              data-swal-text="새로운 관리자가 등록되었습니다!"
              data-swal-type="success"
              onClick={() => onClickSaveMainBtn()}
            >
              저장
            </button>
          </div>
          <NoticeAndEventBanner
            getBannerInfo={getBannerInfo}
            noticeAndEventBanner={noticeAndEventBanner.concat(
              initialNoticeEvent
            )}
            removeNoticeBanner={removeNoticeBanner}
          />
          <div className="save-button">
            <button
              className="btn btn btn-secondary ml-16pt"
              onClick={() => history.push("/")}
            >
              취소
            </button>
            <button
              className="btn btn-success"
              data-toggle="swal"
              data-swal-title="완료!"
              data-swal-text="새로운 관리자가 등록되었습니다!"
              data-swal-type="success"
              onClick={() => onClickSaveNoticeEventBtn()}
            >
              저장
            </button>
          </div>

          <VideoManagement
            artGalleryVideos={artGalleryVideos.concat(initialArtGalleryVideos)}
            instrumentStreetVideos={instrumentStreetVideos.concat(
              initialInstrumentStreetVideos
            )}
            fridayConcertVideos={fridayConcertVideos.concat(
              initialFridayConcertVideos
            )}
            chamverMusicVideos={chamverMusicVideos.concat(
              initialChamverMusicVideos
            )}
            getVideoInfo={getVideoInfo}
            getRemoveVideoInfo={getRemoveVideoInfo}
          />

          <div className="save-button page-section">
            <button
              className="btn btn btn-secondary ml-16pt"
              onClick={() => history.push("/")}
            >
              취소
            </button>
            <button
              className="btn btn-success"
              data-toggle="swal"
              data-swal-title="완료!"
              data-swal-text="새로운 관리자가 등록되었습니다!"
              data-swal-type="success"
              onClick={() => onClickSaveVideosBtn()}
            >
              저장
            </button>
          </div>
          <div className="page-section"></div>
        </div>
      </div>
      <SideMenuBar />
    </div>
  );
};
export default SkinAndBannerDesignView;
