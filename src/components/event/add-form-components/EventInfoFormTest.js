import React, { useState, useRef, useEffect, useCallback } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import PostCodeModal from "../../basic-components/PostCodeModal";

const convertTimeFormat = (str) => {
  // console.log(str);

  const date = new Date(str);
  let result = date.getHours() + ":";

  if (date.getMinutes() < 10) {
    result += "0" + date.getMinutes();
  } else {
    result += date.getMinutes();
  }

  // console.log(result);

  return result;
};

const convertDateFormat = (str) => {
  const date = new Date(str);

  return "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
};

const EventInfoFormTest = ({ formInfo, getFormInfo }) => {
  const [showInputBox, setShowInputBox] = useState(false);
  const toggleInputBox = () => {
    setShowInputBox(!showInputBox);
  };

  const [showPostCodeModal, setShowPostCodeModal] = useState(false);
  const togglePostCodeModal = () => {
    setShowPostCodeModal(!showPostCodeModal);
  };

  const [period, setPeriod] = useState({
    startDate: formInfo.open_date,
    endDate: formInfo.close_date,
    key: "selection",
  });

  const onChangePeriod = (item) => {
    setPeriod({
      startDate: item["selection"].startDate,
      endDate: item["selection"].endDate,
      key: item["selection"].key,
    });
    getFormInfo("open_date", item["selection"].startDate);
    getFormInfo("close_date", item["selection"].endDate);
  };

  const onChangeOpenTime = (e) => {
    getFormInfo("open_time", convertTimeFormat(e));
  };

  const onChangeCloseTime = (e) => {
    getFormInfo("close_time", convertTimeFormat(e));
  };

  const onChangeAge = (e) => {
    getFormInfo("age", parseInt(e.target.value));
  };

  const [allSpectators, setAllSpectators] = useState(false);
  const ageInput = useRef();
  const onChangeAllSpectators = () => {
    setAllSpectators(!allSpectators);

    if (allSpectators) {
      ageInput.current.disabled = false;
      ageInput.current.placeholder = "권장연령";

      getFormInfo("age", "");
    } else {
      ageInput.current.disabled = true;
      ageInput.current.placeholder = "전체관람가";
      getFormInfo("age", 0);
    }
  };

  const priceInput = useRef();

  const onChangeCheckbox_free = (e) => {
    if (e.target.checked) {
      priceInput.current.disabled = true;
      priceInput.current.placeholder = "무료";
    }
    getFormInfo("price", 0);
  };

  const onChangeCheckbox_pay = (e) => {
    if (e.target.checked) {
      priceInput.current.disabled = false;
      priceInput.current.placeholder = "가격";
    }

    getFormInfo("price", "");
  };

  const onChangePrice = (e) => {
    getFormInfo("price", parseInt(e.target.value));
  };

  const getAddress = (address) => {
    getFormInfo("address1", address);
  };

  return (
    <>
      {showPostCodeModal ? (
        <PostCodeModal
          getAddress={getAddress}
          closeModal={togglePostCodeModal}
        />
      ) : (
        ""
      )}
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
                  htmlFor="question"
                  className="col-md-2 col-form-label form-label"
                >
                  제목
                </label>
                <div className="col-md-10">
                  <input
                    id="title"
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="form-control"
                    value={formInfo.name}
                    onChange={(e) => getFormInfo("name", e.target.value)}
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
                  htmlFor="question"
                  className="col-md-2 col-form-label form-label"
                >
                  장소
                </label>
                {showInputBox ? (
                  <div className="col-md-8">
                    <input
                      id="title"
                      type="text"
                      placeholder="장소"
                      className="form-control"
                      value={formInfo.location}
                      onChange={(e) => getFormInfo("location", e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="col-md-8">
                    <select
                      id="select01"
                      data-toggle="select"
                      className="form-control"
                      onChange={(e) => getFormInfo("location", e.target.value)}
                      defaultValue={formInfo.location}
                    >
                      <option value={formInfo.location}>
                        {formInfo.location}
                      </option>
                      <option value="location2">장소2</option>
                      <option value="location3">장소3</option>
                    </select>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => toggleInputBox()}
                >
                  {showInputBox ? "장소 선택" : "직접 입력"}
                </button>
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
                  htmlFor="question"
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
                    value={formInfo.address1}
                    disabled
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => togglePostCodeModal()}
                >
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
                  htmlFor="question"
                  className="col-md-2 col-form-label form-label"
                >
                  상세주소
                </label>
                <div className="col-md-10">
                  <input
                    id="title"
                    type="text"
                    placeholder="상세 주소"
                    className="form-control"
                    value={formInfo.address2}
                    onChange={(e) => getFormInfo("address2", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                htmlFor="question"
                className="col-md-2 col-form-label form-label"
              >
                기간
              </label>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => onChangePeriod(item)}
                moveRangeOnFirstSelection={false}
                ranges={[period]}
                direction="horizontal"
                locale={locales["ko"]}
              />
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                htmlFor="question"
                className="col-md-2 col-form-label form-label"
              >
                시간
              </label>
              <div className="col-md-3">
                <Flatpickr
                  className="form-control"
                  data-enable-time="true"
                  data-no-calendar="true"
                  data-alt-format="H:i"
                  data-date-format="H:i"
                  data-toggle="flatpickr"
                  // id="flatpickrSample05"
                  type="text"
                  value={formInfo.open_time}
                  onChange={(e) => onChangeOpenTime(e)}
                />
              </div>
              -
              <div className="col-md-3">
                <Flatpickr
                  className="form-control"
                  data-enable-time="true"
                  data-no-calendar="true"
                  data-alt-format="H:i"
                  data-date-format="H:i"
                  data-toggle="flatpickr"
                  // id="flatpickrSample05"
                  type="text"
                  value={formInfo.close_time}
                  onChange={(e) => onChangeCloseTime(e)}
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                htmlFor="question"
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
                  autoComplete="off"
                  value={formInfo.age}
                  onChange={(e) => onChangeAge(e)}
                  ref={ageInput}
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
                      // name="radio-stacked2"
                      type="checkbox"
                      className="custom-control-input"
                      onChange={() => onChangeAllSpectators()}
                    />
                    <label
                      htmlFor="radioStacked-1"
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
                htmlFor="question"
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
                  autoComplete="off"
                  value={formInfo.homepage}
                  onChange={(e) => getFormInfo("homepage", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                htmlFor="question"
                className="col-md-2 col-form-label form-label"
              >
                예매 사이트
              </label>
              <div className="col-md-10">
                <input
                  id="maskSample01"
                  type="url"
                  className="form-control"
                  placeholder="www.site.com"
                  data-mask="#.##0,00"
                  data-mask-reverse="true"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label
                id="label-question"
                htmlFor="question"
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
                  autoComplete="off"
                  maxLength="14"
                  value={formInfo.phone}
                  onChange={(e) => getFormInfo("phone", e.target.value)}
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
                  htmlFor="question"
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
                        onChange={(e) => onChangeCheckbox_free(e)}
                      />
                      <label
                        htmlFor="radioStacked1"
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
                        onChange={(e) => onChangeCheckbox_pay(e)}
                      />
                      <label
                        htmlFor="radioStacked2"
                        className="custom-control-label"
                      >
                        유료
                      </label>
                    </div>
                    <div className="col-md-3">
                      <input
                        id=""
                        type="price"
                        className="form-control"
                        value={formInfo.price}
                        ref={priceInput}
                        onChange={(e) => onChangePrice(e)}
                      />
                    </div>
                    <div className="col-md-1">원</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventInfoFormTest;
