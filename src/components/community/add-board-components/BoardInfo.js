import React from "react";

const BoardInfo = () => {
  return (
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
              for="question"
              className="col-md-2 col-form-label form-label"
            >
              이미지
            </label>
            <div className="col-md-8">
              <input
                type="file"
                className=""
                id="customFileUploadMultiple"
                multiple
              />
              <label className="" for="customFileUploadMultiple"></label>
            </div>
            <div className="col-auto d-flex flex-column">
              <button type="submit" className="btn btn-primary">
                삭제
              </button>
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
              className="col-md-2 col-form-label form-label"
            >
              *제목
            </label>
            <div className="col-md-10">
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요 ..."
                className="form-control"
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
              className="col-md-2 col-form-label form-label"
            >
              담당자
            </label>
            <div className="col-md-10">
              <input
                id="title"
                type="text"
                placeholder=""
                className="form-control"
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
              className="col-md-2 col-form-label form-label"
            >
              문의처
            </label>
            <div className="col-md-10">
              <input
                id="title"
                type="text"
                placeholder=""
                className="form-control"
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
              className="col-md-2 col-form-label form-label"
            >
              파일 업로드
            </label>
            <div className="col-md-10">
              <input
                type="file"
                id="file"
                className="custom-file-input form-control"
              />
              <label for="file" className="custom-file-label">
                파일선택
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardInfo;
