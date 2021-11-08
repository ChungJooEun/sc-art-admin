import React from "react";

const VideoAddForm = () => {
  return (
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
          영상URL:{" "}
        </label>
        <div className="col-md-9">
          <input
            id="title"
            type="url"
            placeholder="http://"
            className="form-control"
          />
        </div>
        <form className="d-none d-md-flex">
          <button type="submit" className="btn btn-primary">
            추가{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoAddForm;
