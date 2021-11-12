import React from "react";

const BannerAddForm = () => {
  return (
    <div className="col-lg-12">
      <div className="list-group">
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
                배너 이미지
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
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label
              id="label-question"
              htmlFor="question"
              className="col-md-2 col-form-label form-label"
            >
              링크주소
            </label>
            <div className="col-md-9">
              <input
                id="maskSample01"
                type="url"
                className="form-control"
                placeholder="www.site.com"
                data-mask="#.##0,00"
                data-mask-reverse="true"
                autocomplete="off"
              />
            </div>
            <form className="d-none d-md-flex">
              <button type="submit" className="btn btn-primary">
                추가{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAddForm;
