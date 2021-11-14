import React, { useRef } from "react";
import YouTube from "react-youtube";

const opts = {
  height: "100%",
  width: "100%",
};

const VideoListItem = ({ vId }) => {
  const title = useRef();

  const onReady = (e) => {
    title.current.innerText = e.target.playerInfo.videoData.title;
  };

  return (
    <div className="col-lg-4 card-group-row__col">
      <div className="card card-group-row__card p-16pt">
        <YouTube
          className="card-img card-img-cover"
          videoId={vId}
          opts={opts}
          onReady={onReady}
        />
        <div className="d-flex">
          <div className="d-flex flex-column flex">
            <a className="mb-8pt">
              <strong ref={title}></strong>
            </a>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-secondary ml-16pt" data-toggle="swal">
              삭제{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListItem;
