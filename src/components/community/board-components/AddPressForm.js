import React from "react";

const AddPressForm = () => {
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
              className="col-md-1 col-form-label form-label"
            >
              제목
            </label>
            <div className="col-md-11">
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
              className="col-md-1 col-form-label form-label"
            >
              링크:
            </label>
            <div className="col-md-11">
              <input
                id="title"
                type="url"
                placeholder="http://"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <form className="d-none d-md-flex">
        <button type="submit" className="btn btn-block btn-primary">
          추가
        </button>
      </form>
    </div>
  );
};

export default AddPressForm;
