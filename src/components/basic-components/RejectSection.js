import React from "react";

const RejectSection = React.memo(({ rejection_reason, state }) => {
  return (
    <>
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
              기각사유
            </label>
            <div className="col-md-8">
              <select id="custom-select" className="form-control custom-select">
                <option selected="">정보 불충분</option>
                <option value="1">부적절</option>
                <option value="2">기타</option>
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
          <div className="form-row">
            <textarea
              id="question"
              placeholder="기각사유..."
              rows="4"
              className="form-control"
              value={rejection_reason}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
});

export default React.memo(RejectSection);
