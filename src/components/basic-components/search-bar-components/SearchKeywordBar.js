import React, { useState } from "react";

const SearchKeywordBar = ({ searching, searchOptions }) => {
  const [searchInfo, setSearchInfo] = useState({
    search_type: window.location.href.includes("event")
      ? "EVENT_NAME"
      : "SPACE_NAME",
    search_word: "",
  });

  const onChangeSearchInfo = (dataName, data) => {
    setSearchInfo({
      ...searchInfo,
      [dataName]: data,
    });
  };

  const onClickSearchButton = () => {
    searching(searchInfo);
  };
  return (
    <>
      <div className="flex"></div>
      <div
        className="navbar navbar-expand x-0 pl-lg-16pt navbar-light bg-body"
        id="default-navbar"
        data-primary=""
      >
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

export default SearchKeywordBar;
