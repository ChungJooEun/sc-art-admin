import React from "react";

import VideoManagementContainer from "./video-management/VideoManagementContainer";

const VideoManagement = ({
  artGalleryVideos,
  instrumentStreetVideos,
  fridayConcertVideos,
  chamverMusicVideos,
  getVideoInfo,
  getRemoveVideoInfo,
}) => {
  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">동영상 관리</div>
      </div>

      <VideoManagementContainer
        containerTitle="서리풀 청년 아트 갤러리"
        videosInfo={artGalleryVideos}
        getVideoInfo={getVideoInfo}
        getRemoveVideoInfo={getRemoveVideoInfo}
      />
      <VideoManagementContainer
        containerTitle="서리풀 악기거리"
        videosInfo={instrumentStreetVideos}
        getVideoInfo={getVideoInfo}
        getRemoveVideoInfo={getRemoveVideoInfo}
      />
      <VideoManagementContainer
        containerTitle="서초 금요 음악회"
        videosInfo={fridayConcertVideos}
        getVideoInfo={getVideoInfo}
        getRemoveVideoInfo={getRemoveVideoInfo}
      />
      <VideoManagementContainer
        containerTitle="서초 실내악 축제"
        videosInfo={chamverMusicVideos}
        getVideoInfo={getVideoInfo}
        getRemoveVideoInfo={getRemoveVideoInfo}
      />
    </div>
  );
};

export default VideoManagement;
