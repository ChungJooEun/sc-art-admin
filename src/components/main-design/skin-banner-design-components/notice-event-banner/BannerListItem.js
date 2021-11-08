import React from "react";

const BannerListItem = () => {
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
                for="question"
                className="col-md-7 col-form-label form-label"
              >
                링크주소
              </label>
              <div className="flex"></div>
              <div className="col-md-3">
                <button
                  className="btn btn-secondary ml-16pt"
                  data-toggle="swal"
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
