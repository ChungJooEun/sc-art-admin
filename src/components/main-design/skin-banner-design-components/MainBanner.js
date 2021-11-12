import React from "react";

const MainBanner = () => {
  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">메인배경</div>
      </div>
      <div className="list-group">
        <div className="list-group-item">
          <div
            role="group"
            aria-labelledby="label-question"
            className="m-0 form-group"
          >
            <div className="form-row">
              <div className="flex" style={{ maxWidth: "100%" }}>
                <img
                  src="../assets/images/256_rsz_thomas-russell-751613-unsplash.jpg"
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
                  className=""
                  id="customFileUploadMultiple"
                  multiple
                />
                <label className="" htmlFor="customFileUploadMultiple"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
