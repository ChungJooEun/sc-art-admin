import React from "react";

import BannerAddForm from "./notice-event-banner/BannerAddForm";
import BannerListItem from "./notice-event-banner/BannerListItem";

const NoticeAndEventBanner = ({
  getBannerInfo,
  noticeAndEventBanner,
  removeNoticeBanner,
}) => {
  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">공지사항/이벤트 배너</div>
      </div>
      <div className="row">
        <BannerAddForm getBannerInfo={getBannerInfo} />
        {noticeAndEventBanner.map((bannerInfo) => (
          <BannerListItem
            bannerInfo={bannerInfo}
            removeNoticeBanner={removeNoticeBanner}
            key={bannerInfo.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NoticeAndEventBanner;
