import React, { useState } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

const SearchBar = ({ searching, searchOptions }) => {
  const onClickSearchButton = () => {
    searching(dateRange, searchInfo);
  };

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [searchInfo, setSearchInfo] = useState({
    search_type: "EVENT_NAME",
    search_word: "",
  });

  const onChangeDateRange = (dateAry) => {
    setDateRange(dateAry);
  };

  const getSearchInfo = (dataName, data) => {
    setSearchInfo({
      ...searchInfo,
      [dataName]: data,
    });
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
              {searchOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
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
