import React from "react";

const PostSaveBtn = ({
  options,
  onSubmitEvent,
  state,
  onClickRemoveBtn,
  showDelBtn,
  getFormInfo,
}) => {
  const getOptions = () => {
    let optionAry = [];

    for (let i = 0; i < options.length; i++) {
      optionAry.push(
        <option
          // selected={state === options[i].value ? true : false}
          value={options[i].value}
          key={options[i].value}
        >
          {options[i].name}
        </option>
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
            <select
              id="custom-select"
              className="form-control custom-select"
              defaultValue={state}
              onChange={(e) => getFormInfo("state", e.target.value)}
            >
              {getOptions()}
            </select>
          </div>
          <div className="flex"></div>
          {showDelBtn ? (
            <div className="col-auto d-flex flex-column">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onClickRemoveBtn()}
              >
                삭제
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="col-auto d-flex flex-column">
            <button type="button" className="btn btn-secondary">
              취소
            </button>
          </div>
          <div className="col-auto d-flex flex-column">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSubmitEvent()}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(PostSaveBtn);
