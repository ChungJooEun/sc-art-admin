import React, { useState } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

const SearchBar = ({ searchInfo, getSearchInfo, searching }) => {
  const onClickSearchButton = () => {
    searching(dateRange);
  };

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const onChangeDateRange = (dateAry) => {
    setDateRange(dateAry);
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
            value={dateRange}
            onChange={(dateAry) => onChangeDateRange(dateAry)}
          />
        </div>
        <div>
          <div className="search-form search-form--dark">
            <select
              id="custom-select"
              className="form-control custom-select"
              defaultValue={searchInfo.search_type}
              onChange={(e) => getSearchInfo("search_type", e.target.value)}
            >
              <option value="EVENT_NAME">행사명</option>
              <option value="WRITER">작성자</option>
              <option value="LOCATION">위치</option>
              <option value="FESTIVAL_NAME">축제명</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="검색"
              id="searchSample03"
              value={searchInfo.search_word}
              onChange={(e) => getSearchInfo("search_word", e.target.value)}
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
