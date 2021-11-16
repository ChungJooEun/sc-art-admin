import React, { useState } from "react";

const VideoAddForm = React.memo(() => {
  const [url, setUrl] = useState("");

  const getUrl = () => {};

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

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
            value={url}
            onChange={(e) => {
              onChangeUrl(e);
            }}
          />
        </div>
        <form className="d-none d-md-flex">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => getUrl()}
          >
            추가{" "}
          </button>
        </form>
      </div>
    </div>
  );
});

export default React.memo(VideoAddForm);
