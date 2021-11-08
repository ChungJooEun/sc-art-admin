import React from "react";

import VideoManagementContainer from "./video-management/VideoManagementContainer";

const VideoManagement = () => {
  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">동영상 관리</div>
      </div>

      <VideoManagementContainer containerTitle="서리풀 청년 아트 갤러리" />
      <VideoManagementContainer containerTitle="서리풀 악끼거리" />
      <VideoManagementContainer containerTitle="서초 금요 음악회" />
      <VideoManagementContainer containerTitle="서초 실내악 축제" />
    </div>
  );
};

export default VideoManagement;
