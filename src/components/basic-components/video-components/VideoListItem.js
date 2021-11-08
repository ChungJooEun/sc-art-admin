import React from "react";

const VideoListItem = () => {
  return (
    <div className="col-lg-4 card-group-row__col">
      <div className="card card-group-row__card p-16pt">
        <a className="d-block mb-16pt">
          <img
            src="../assets/images/stories/256_rsz_jared-rice-388260-unsplash.jpg"
            alt=""
            className="card-img card-img-cover"
          />
        </a>
        <div className="d-flex">
          <div className="d-flex flex-column flex">
            <a className="mb-8pt">
              <strong>영상 제목입니다.</strong>
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
