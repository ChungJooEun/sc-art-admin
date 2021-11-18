import React, { useEffect, useState, useContext } from "react";
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
  // 메인 베너
  const [mainBanner, setMainBanner] = useState(null);
  // 공지사항/이벤트 배너
  const [noticeAndEventBanner, setNoticeAndEventBanner] = useState([]);
  // 서리풀 청년 아트 개럴리
  const [artGalleryVideos, setArtGalleryVideos] = useState([]);
  // 서리풀 악끼거리
  const [instrumentStreetVideos, setInstrumentStreetVideos] = useState([]);
  // 서초 금요 음악회
  const [fridayConcertVideos, setFridayConcertVideos] = useState([]);
  // 서초 실내악 축제
  const [chamverMusicVideos, setChamverMusicVidoes] = useState([]);

  const [vIdInfos, setvIdInfos] = useState({
    artId: 0,
    instrument: 0,
    concert: 0,
    chamver: 0,
  });

  // 메인 베너 이미지 가져오기
  const getMainBannerImg = (imgFile) => {
    setMainBanner(imgFile);
  };

  // 공지사항 / 이벤트 배너 입력 정보 가져오기
  const getBannerInfo = (imgFile, link, imgBase64) => {
    setNoticeAndEventBanner(
      noticeAndEventBanner.concat({
        link: link,
        imgFile: imgFile,
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

  // 배열과 삭제할 id를 받아 조건으로 삭제 후 return
  const removeAtList = (rId, list) => {
    let ary = list;
    ary = ary.filter((item) => item.vId !== rId);
    return ary;
  };

  // 비디오 삭제 버튼 클릭시,
  const getRemoveVideoInfo = (rId, type) => {
    switch (type) {
      case 0:
        setArtGalleryVideos(removeAtList(rId, artGalleryVideos));
        break;
      case 1:
        setInstrumentStreetVideos(removeAtList(rId, instrumentStreetVideos));
        break;
      case 2:
        setFridayConcertVideos(removeAtList(rId, fridayConcertVideos));
        break;
      case 3:
        setChamverMusicVidoes(removeAtList(rId, chamverMusicVideos));
        break;
      default:
        break;
    }
  };

  const saveBannerInfo = async (data) => {
    const url = "http://118.67.154.118:3000/api/admin/main/modify";

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        console.log(" ==== seccess save data ====");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { actions } = useContext(MenuContext);
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
          <NoticeAndEventBanner
            getBannerInfo={getBannerInfo}
            noticeAndEventBanner={noticeAndEventBanner}
          />

          <VideoManagement
            artGalleryVideos={artGalleryVideos}
            instrumentStreetVideos={instrumentStreetVideos}
            fridayConcertVideos={fridayConcertVideos}
            chamverMusicVideos={chamverMusicVideos}
            getVideoInfo={getVideoInfo}
            getRemoveVideoInfo={getRemoveVideoInfo}
          />

          <div className="save-button page-section">
            <button className="btn btn btn-secondary ml-16pt">취소</button>
            <button
              className="btn btn-success"
              data-toggle="swal"
              data-swal-title="완료!"
              data-swal-text="새로운 관리자가 등록되었습니다!"
              data-swal-type="success"
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
