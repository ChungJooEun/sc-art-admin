import React from "react";

const PlaceInfoForm = () => {
  return (
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
                장소
              </label>
              <div className="col-md-10">
                <input
                  id="title"
                  type="text"
                  placeholder="장소"
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
                주소
              </label>
              <div className="col-md-8">
                <input
                  id="title"
                  type="text"
                  placeholder="주소"
                  className="form-control"
                />
              </div>

              <button type="button" className="btn btn-primary">
                주소 검색
              </button>
            </div>
          </div>
          <br />
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
                상세 주소
              </label>
              <div className="col-md-10">
                <input
                  id="title"
                  type="text"
                  placeholder="상세 주소"
                  className="form-control"
                />
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
              영업시간
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
            className="m-0 form-group"
          >
            <div className="form-row align-items-center">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              >
                휴무일
              </label>
              <div className="col-md-10">
                <input
                  id="title"
                  type="text"
                  placeholder="휴무일"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="list-group-item">
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
                    <label for="radioStacked1" className="custom-control-label">
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
                    <label for="radioStacked2" className="custom-control-label">
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
        </div> */}
      </div>
    </div>
  );
};

export default PlaceInfoForm;
