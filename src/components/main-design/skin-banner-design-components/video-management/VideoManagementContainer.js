import React from "react";
import VideoAddFormTest from "../../../basic-components/video-components/VideoAddFormTest";
import VideoListItem from "../../../basic-components/video-components/VideoListItem";

const VideoManagementContainer = ({
  containerTitle,
  videosInfo,
  getVideoInfo,
  getRemoveVideoInfo,
}) => {
  const getVideoUrl = (url) => {
    switch (containerTitle) {
      case "서리풀 청년 아트 갤러리":
        getVideoInfo(url, 0);
        break;
      case "서리풀 악끼거리":
        getVideoInfo(url, 1);
        break;
      case "서초 금요 음악회":
        getVideoInfo(url, 2);
        break;
      case "서초 실내악 축제":
        getVideoInfo(url, 3);
        break;
      default:
        return;
    }
  };

  const getRemoveInfo = (rId) => {
    switch (containerTitle) {
      case "서리풀 청년 아트 갤러리":
        getRemoveVideoInfo(rId, 0);
        break;
      case "서리풀 악끼거리":
        getRemoveVideoInfo(rId, 1);
        break;
      case "서초 금요 음악회":
        getRemoveVideoInfo(rId, 2);
        break;
      case "서초 실내악 축제":
        getRemoveVideoInfo(rId, 3);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="list-group-item">
        <h3>
          {containerTitle}
          <span style={{ color: "gray", fontSize: "14px" }}>
            메인 페이지에 추가되었으면 하는 영상이 있을 경우 추가해주세요
          </span>
        </h3>

        <VideoAddFormTest getVideoInfo={getVideoUrl} />
      </div>
      <div className="row card-group-row">
        {videosInfo.map((videoInfo) => (
          <VideoListItem
            videoInfo={videoInfo}
            removeVideo={getRemoveInfo}
            key={videoInfo.id}
          />
        ))}
      </div>
    </>
  );
};

export default VideoManagementContainer;
