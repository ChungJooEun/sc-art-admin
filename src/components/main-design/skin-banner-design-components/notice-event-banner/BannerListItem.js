import React from "react";

const BannerListItem = ({ bannerInfo, removeNoticeBanner }) => {
  const getImgSrc = (bannerInfo) => {
    if (bannerInfo.imgBase64.length === 1) {
      return bannerInfo.imgBase64[0];
    } else if (bannerInfo.imgFile) {
      return `https://culture.seocho.go.kr:8443/community-service/main/${bannerInfo.imgFile}`;
    } else {
      return "/assets/images/256_rsz_thomas-russell-751613-unsplash.jpg";
    }
  };

  return (
    <div className="col-lg-6 card-group-row__col">
      <div className="card card-group-row__card p-16pt">
        <div className="list-group-item">
          <div
            role="group"
            aria-labelledby="label-question"
            className="m-0 form-group"
          >
            <div className="form-row">
              <div className="flex" style={{ maxWidth: "100%" }}>
                <img
                  src={getImgSrc(bannerInfo)}
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
                className="col-md-7 col-form-label form-label"
              >
                {bannerInfo.link}
              </label>
              <div className="flex"></div>
              <div className="col-md-3">
                <button
                  className="btn btn-secondary ml-16pt"
                  data-toggle="swal"
                  onClick={() => removeNoticeBanner(bannerInfo.id)}
                >
                  삭제{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerListItem;
