import React from "react";

const PostSaveBtn = ({ options }) => {
  const getOptions = () => {
    let optionAry = [
      <option selected value={options[0].value}>
        {options[0].name}
      </option>,
    ];

    for (let i = 1; i < options.length; i++) {
      optionAry.push(
        <option value={options[i].value}>{options[i].name}</option>
      );
    }

    return optionAry;
  };

  return (
    <div className="list-group-item">
      <div
        role="group"
        aria-labelledby="label-question"
        className="m-0 form-group"
      >
        <div className="form-row align-items-center">
          <label className="col-md-1 col-form-label form-label">상태</label>
          <div className="col-md-8">
            <select id="custom-select" className="form-control custom-select">
              {getOptions()}
            </select>
          </div>
          <div className="flex"></div>
          <div className="col-auto d-flex flex-column">
            <button type="submit" className="btn btn-outline-secondary">
              삭제
            </button>
          </div>
          <div className="col-auto d-flex flex-column">
            <button type="submit" className="btn btn-secondary">
              취소
            </button>
          </div>
          <div className="col-auto d-flex flex-column">
            <button type="submit" className="btn btn-primary">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSaveBtn;
