import React from "react";

const SearchBar = () => {
  return (
    <>
      <div class="flex"></div>
      <div
        className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
        id="default-navbar"
        data-primary=""
      >
        <div className="mr-16pt">
          <input
            id="flatpickrSample02"
            type="hidden"
            className="form-control flatpickr-input"
            data-toggle="flatpickr"
            data-flatpickr-mode="range"
            value="2018-10-07 to 2018-10-15"
          />
        </div>
        <div>
          <div className="search-form search-form--dark">
            <select id="custom-select" className="form-control custom-select">
              <option selected="">행사명</option>
              <option value="1">작성자</option>
              <option value="2">위치</option>
              <option value="3">축제명</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="검색"
              id="searchSample03"
            />
            <button className="btn" type="button">
              <i className="material-icons">search</i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
