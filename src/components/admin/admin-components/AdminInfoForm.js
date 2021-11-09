import React from "react";

const AdminInfoForm = () => {
  return (
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
              for="question"
              className="col-md-2 col-form-label form-label"
            >
              *관리자 ID
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
              *비밀번호
            </label>
            <div className="col-md-10">
              <input
                id="title"
                type="password"
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
              *그룹명
            </label>
            <div className="col-md-10">
              <select id="custom-select" className="form-control custom-select">
                <option selected="">일반 관리자</option>
                <option value="1">협업사 관리자</option>
                <option value="2">슈퍼 관리자</option>
              </select>
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
              연락처
            </label>
            <div className="col-md-10">
              <input
                id="title"
                type="tel"
                placeholder="000-0000-0000"
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
          <div className="form-row">
            <label
              id="label-question"
              for="question"
              className="col-md-2 col-form-label form-label"
            >
              메모
            </label>
            <div className="col-md-10">
              <textarea
                id="question"
                placeholder="메모..."
                rows="4"
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoForm;
