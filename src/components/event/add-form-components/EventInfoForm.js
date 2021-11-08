import React from "react";

const EventInfoForm = () => {
  return (
    <div className="row">
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

      <div className="col-lg-8">
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
                  제목
                </label>
                <div className="col-md-10">
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
                  className="col-md-2 col-form-label form-label"
                >
                  장소
                </label>
                <div className="col-md-10">
                  <select
                    id="select01"
                    data-toggle="select"
                    className="form-control"
                  >
                    <option selected>장소1</option>
                    <option>장소2</option>
                    <option>장소3</option>
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
                  주소
                </label>
                <div className="col-md-8">
                  <input
                    id="title"
                    type="text"
                    placeholder="상세주소"
                    className="form-control"
                  />
                </div>
                <form className="d-none d-md-flex">
                  <button type="submit" className="btn btn-primary">
                    검색
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              >
                기간
              </label>
              <div className="col-md-7">
                <input
                  id=""
                  type="text"
                  className="form-control"
                  placeholder="Range example"
                  data-toggle="daterangepicker"
                  data-daterangepicker-drops="down"
                  data-daterangepicker-start-date="2018/11/06"
                  data-daterangepicker-end-date="2018/12/06"
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              >
                시간
              </label>
              <div className="col-md-3">
                <input
                  id="flatpickrSample05"
                  type="text"
                  className="form-control"
                  placeholder="Flatpickr time example"
                  data-toggle="flatpickr"
                  data-flatpickr-enable-time="true"
                  data-flatpickr-no-calendar="true"
                  data-flatpickr-alt-format="H:i"
                  data-flatpickr-date-format="H:i"
                  value="15:35"
                />
              </div>
              -
              <div className="col-md-3">
                <input
                  id="flatpickrSample05"
                  type="text"
                  className="form-control"
                  placeholder="Flatpickr time example"
                  data-toggle="flatpickr"
                  data-flatpickr-enable-time="true"
                  data-flatpickr-no-calendar="true"
                  data-flatpickr-alt-format="H:i"
                  data-flatpickr-date-format="H:i"
                  value="15:35"
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              >
                권장연령
              </label>
              <div className="col-md-5">
                <input
                  id="maskSample01"
                  type="text"
                  className="form-control"
                  placeholder="12"
                  data-mask="#.##0,00"
                  data-mask-reverse="true"
                  autocomplete="off"
                />
              </div>
              <div className="col-md-1">
                <label className="">세</label>
              </div>
              <div className="col-md-4">
                <div className="custom-controls-stacked row">
                  <div className="custom-control custom-radio">
                    <input
                      id="radioStacked-1"
                      name="radio-stacked2"
                      type="radio"
                      className="custom-control-input"
                      checked=""
                    />
                    <label
                      for="radioStacked-1"
                      className="custom-control-label"
                    >
                      전체관람가
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              >
                홈페이지
              </label>
              <div className="col-md-10">
                <input
                  id="maskSample01"
                  type="url"
                  className="form-control"
                  placeholder="www.site.com"
                  data-mask="#.##0,00"
                  data-mask-reverse="true"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              >
                전화번호
              </label>
              <div className="col-md-10">
                <input
                  id="maskSample02"
                  type="text"
                  className="form-control"
                  placeholder="000 0000 0000"
                  data-mask="(000) 000-0000"
                  autocomplete="off"
                  maxlength="14"
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div
              role="group"
              aria-labelledby="label-question"
              className="m-0 form-group align-items-center"
            >
              <div className="form-row">
                <label
                  id="label-question"
                  for="question"
                  className="col-md-2 col-form-label form-label"
                >
                  가격
                </label>
                <div className="col-md-10">
                  <div className="custom-controls-stacked row">
                    <div className="custom-control custom-radio col-lg-3">
                      <input
                        id="radioStacked1"
                        name="radio-stacked"
                        type="radio"
                        className="custom-control-input"
                        checked=""
                      />
                      <label
                        for="radioStacked1"
                        className="custom-control-label"
                      >
                        무료
                      </label>
                    </div>
                    <div className="custom-control custom-radio col-lg-2">
                      <input
                        id="radioStacked2"
                        name="radio-stacked"
                        type="radio"
                        className="custom-control-input"
                      />
                      <label
                        for="radioStacked2"
                        className="custom-control-label"
                      >
                        유료
                      </label>
                    </div>
                    <div className="col-md-3">
                      <input id="" type="price" className="form-control" />
                    </div>
                    <div className="col-md-1">원</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoForm;
