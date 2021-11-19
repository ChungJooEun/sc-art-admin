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
  const [initialNEIdList, setInitialNEIdList] = useState([]);
  // 서리풀 청년 아트 갤러리
  const [artGalleryVideos, setArtGalleryVideos] = useState([]);
  const [initialAGVIdList, setInitialAGVIdList] = useState([]);
  // 서리풀 악기거리
  const [instrumentStreetVideos, setInstrumentStreetVideos] = useState([]);
  const [initialISVIdList, setInitialISVIdList] = useState([]);
  // 서초 금요 음악회
  const [fridayConcertVideos, setFridayConcertVideos] = useState([]);
  const [initialFCVIdList, setInitialFCVIdList] = useState([]);
  // 서초 실내악 축제
  const [chamverMusicVideos, setChamverMusicVidoes] = useState([]);
  const [initialCMVIdList, setInitialCMNIdList] = useState([]);

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
      })
    );
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

  // 초기 initial data를 삭제시, db삭제 요청
  const requestDelVideo = async (rId) => {
    const url = "http://localhost:9200/api/";

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
  const removeAtList = (rId, list, initialIdList) => {
    let ary = list;

    // 처음에 init한 data를 지우려는지 체크
    for (let i = 0; i < initialIdList.length; i++) {
      if (rId === initialIdList[i]) {
        // 기존 데이터를 삭제하려 한다면, 삭제 api 호출
        requestDelVideo(rId);
      }
    }

    ary = ary.filter((item) => item.vId !== rId);
    return ary;
  };

  // 비디오 삭제 버튼 클릭시,
  const getRemoveVideoInfo = (rId, type) => {
    switch (type) {
      case 0:
        setArtGalleryVideos(
          removeAtList(rId, artGalleryVideos, initialAGVIdList)
        );
        break;
      case 1:
        setInstrumentStreetVideos(
          removeAtList(rId, instrumentStreetVideos, initialISVIdList)
        );
        break;
      case 2:
        setFridayConcertVideos(
          removeAtList(rId, fridayConcertVideos, initialFCVIdList)
        );
        break;
      case 3:
        setChamverMusicVidoes(
          removeAtList(rId, chamverMusicVideos, initialCMVIdList)
        );
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
    const url = "http://localhost:9200/api/main/bg";

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
    const url = "http://localhost:9200/api/main/banners";

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
    const url = "http://localhost:9200/api/main/videos";

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
    // initial data 받아오기
    const getInitialData = async () => {
      const url = "http://localhost:9200/api/";

      try {
        const res = await axios.get(url);

        if (res.status === 200) {
          let ary;
          const { main, banners, videos1, videos2, videos3, videos4 } =
            res.data;

          // 메인 배너
          setMainBanner(main);

          // 공지사항 & 이벤트 베너
          setNoticeAndEventBanner(banners);

          // api에서 받아온 공지사항 & 이벤트 id 저장
          ary = [];
          for (let i = 0; i < banners.length; i++) {
            ary.push(banners[i].id);
          }
          setInitialNEIdList(ary);

          // 서리풀 청년 아트 갤러리
          setArtGalleryVideos(videos1);
          ary = [];
          for (let i = 0; i < videos1; i++) {
            ary.push(videos1[i].id);
          }
          setInitialAGVIdList(ary);

          // 서리풀 악기거리
          setInstrumentStreetVideos(videos2);
          ary = [];
          for (let i = 0; i < videos2.length; i++) {
            ary.push(videos2[i].id);
          }
          setInitialISVIdList(ary);

          // 서초 금요 음악회
          setFridayConcertVideos(videos3);
          ary = [];
          for (let i = 0; i < videos3.length; i++) {
            ary.push(videos3[i].id);
          }
          setInitialFCVIdList(ary);

          // 서초 실내악 축제
          setChamverMusicVidoes(videos4);
          ary = [];
          for (let i = 0; i < videos4.length; i++) {
            ary.push(videos4[i].id);
          }
          setInitialCMNIdList(ary);
        }
      } catch (e) {
        console.log(e);
      }
    };

    // initial data는 해당 data의 Id 정보를 가지고 있음
    // 받아온 데이터를 기존의 데이터에 init, initailIdList에는 id 값을 추출하여 사용
    // getInitialData();

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
              onClick={() => onClickSaveMainBtn()}
            >
              저장
            </button>
          </div>
          <NoticeAndEventBanner
            getBannerInfo={getBannerInfo}
            noticeAndEventBanner={noticeAndEventBanner}
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
            artGalleryVideos={artGalleryVideos}
            instrumentStreetVideos={instrumentStreetVideos}
            fridayConcertVideos={fridayConcertVideos}
            chamverMusicVideos={chamverMusicVideos}
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
