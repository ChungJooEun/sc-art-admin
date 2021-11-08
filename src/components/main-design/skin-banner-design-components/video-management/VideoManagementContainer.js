import React from "react";
import VideoAddForm from "../../../basic-components/video-components/VideoAddForm";
import VideoListItem from "../../../basic-components/video-components/VideoListItem";

const VideoManagementContainer = ({ containerTitle }) => {
  return (
    <>
      <div className="list-group-item">
        <h3>
          {containerTitle}
          <span style={{ color: "gray", fontSize: "14px" }}>
            메인 페이지에 추가되었으면 하는 영상이 있을 경우 추가해주세요
          </span>
        </h3>

        <VideoAddForm />
      </div>
      <div className="row card-group-row">
        <VideoListItem />
        <VideoListItem />
        <VideoListItem />
      </div>
    </>
  );
};

export default VideoManagementContainer;
