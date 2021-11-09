import React from "react";

const ImageForm = () => {
  return (
    <div className="col-lg-4">
      <div className="card mb-lg-0">
        <div className="list-group list-group-flush">
          <div className="list-group-item p-16pt">
            <a className="d-block mb-16pt">
              <img
                src="../assets/images/stories/256_rsz_jared-rice-388260-unsplash.jpg"
                alt=""
                className="card-img card-img-cover"
              />
            </a>
            <div className="form-row align-items-center">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              ></label>
              <div className="col-md-10">
                <input
                  type="file"
                  className=""
                  id="customFileUploadMultiple"
                  multiple=""
                />
                <label className="" for="customFileUploadMultiple"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
