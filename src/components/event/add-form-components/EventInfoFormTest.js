import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import Select from "react-select";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const convertTimeFormat = (str) => {
  const date = new Date(str);
  let result = date.getHours() + ":";

  if (date.getMinutes() < 10) {
    result += "0" + date.getMinutes();
  } else {
    result += date.getMinutes();
  }

  return result;
};

const EventInfoFormTest = React.memo(
  ({
    formInfo,
    getFormInfo,
    getPeriod,
    open_time,
    close_time,
    getTimeInfo,
    togglePostCodeModal,
  }) => {
    const [showInputBox, setShowInputBox] = useState(false);
    const toggleInputBox = () => {
      setShowInputBox(!showInputBox);
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
      getPeriod(item["selection"].startDate, item["selection"].endDate);
    };

    const onChangeOpenTime = (e) => {
      console.log(e);
      getTimeInfo("open_time", convertTimeFormat(e));
    };

    const onChangeCloseTime = (e) => {
      getTimeInfo("close_time", convertTimeFormat(e));
    };

    const onChangeAge = (e) => {
      getFormInfo("age", parseInt(e.target.value));
    };

    const [allSpectators, setAllSpectators] = useState(
      formInfo.age === 0 ? true : false
    );
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

    const [placeOptions, setPlaceOptions] = useState(null);

    useEffect(() => {
      const getPlaceList = async () => {
        const url = `https://culture.seocho.go.kr:3000/api/admin/cultural-space/list`;

        try {
          const response = await axios.get(url, {
            params: {
              sort_type: "desc",
              sort_column: "create_date",
              page: 1,
              count: 1000,
              userid: window.sessionStorage.getItem("userid"),
            },
          });

          if (response.status === 200) {
            let options = [];

            for (let i = 0; i < response.data.list.length; i++) {
              options.push({
                value: response.data.list[i].id,
                label: response.data.list[i].name,
              });
            }
            setPlaceOptions(options);
          }
        } catch (e) {
          console.log(e);
        }
      };
      getPlaceList();
    }, []);

    return (
      <>
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
                        onChange={(e) =>
                          getFormInfo("location", e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <div className="col-md-8">
                      <Select
                        options={placeOptions}
                        defaultValue={{ label: formInfo.location, value: "1" }}
                        closeMenuOnSelect={true}
                        id="select01"
                        placeholder="종류 선택"
                        onChange={(e) => getFormInfo("location", e.label)}
                        isSearchable={true}
                        select
                      />
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
                    type="text"
                    defaultValue={open_time}
                    value={open_time}
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
                    ㄴ
                    type="text"
                    defaultValue={close_time}
                    value={close_time}
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
                    type="number"
                    className="form-control"
                    placeholder="12"
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
                        checked={formInfo.age === 0 ? true : false}
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
                    value={formInfo.reservation_site}
                    onChange={(e) =>
                      getFormInfo("reservation_site", e.target.value)
                    }
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
                          checked={formInfo.price === 0 ? true : false}
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
                          checked={formInfo.price > 0 ? true : false}
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
                          type="number"
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
  }
);

export default React.memo(EventInfoFormTest);
