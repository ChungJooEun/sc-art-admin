import React, { useState } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

const convertDateFormat = (dateString) => {
  if (dateString === "") {
    return "";
  }
  const date = new Date(dateString);

  let str = "" + date.getFullYear();

  if (date.getMonth() < 9) {
    str += "0" + (date.getMonth() + 1);
  } else {
    str += date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    str += "0" + date.getDate();
  } else {
    str += date.getDate();
  }
  return str;
};

const SearchBar = ({ searching, searchOptions }) => {
  const [dateRange, setDateRange] = useState({
    from_date: "",
    to_date: "",
  });

  const [searchInfo, setSearchInfo] = useState({
    search_type: searchOptions[0].value,
    search_word: "",
  });

  const onChangeDateRange = (dAray) => {
    if (dAray.length === 1) {
      setDateRange({
        from_date: dAray[0],
        to_date: dAray[0],
      });
    } else {
      setDateRange({
        from_date: dAray[0],
        to_date: dAray[1],
      });
    }
  };

  const onChangeSearchInfo = (dataName, data) => {
    setSearchInfo({
      ...searchInfo,
      [dataName]: data,
    });
  };

  const onClickSearchButton = () => {
    let dateInfos = {
      from_date: convertDateFormat(dateRange.from_date),
      to_date: convertDateFormat(dateRange.to_date),
    };

    searching(dateInfos, searchInfo);
  };

  return (
    <>
      <div className="flex"></div>
      <div
        className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
        id="default-navbar"
        data-primary=""
      >
        <div className="mr-16pt">
          <Flatpickr
            className="form-control flatpickr-input"
            data-toggle="flatpickr"
            options={{ mode: "range" }}
            onChange={(dAray) => onChangeDateRange(dAray)}
            placeholder="시작날짜 - 종료날짜"
          />
        </div>

        <div>
          <div className="search-form search-form--dark">
            <select
              id="custom-select"
              className="form-control custom-select"
              onChange={(e) =>
                onChangeSearchInfo("search_type", e.target.value)
              }
            >
              {searchOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="검색"
              id="searchSample03"
              value={searchInfo.search_word}
              onChange={(e) =>
                onChangeSearchInfo("search_word", e.target.value)
              }
            />
            <button
              className="btn"
              type="button"
              onClick={() => onClickSearchButton()}
            >
              <i className="material-icons">search</i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
