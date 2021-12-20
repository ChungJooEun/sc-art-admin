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

const SearchPeriodBar = ({ searching }) => {
  const [dateRange, setDateRange] = useState({
    from_date: "",
    to_date: "",
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

  const onClickSearchButton = () => {
    let dateInfos = {
      from_date: convertDateFormat(dateRange.from_date),
      to_date: convertDateFormat(dateRange.to_date),
    };

    searching(dateInfos);
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
          <div className="mr-16pt search-form">
            <Flatpickr
              className="form-control flatpickr-input"
              data-toggle="flatpickr"
              options={{ mode: "range" }}
              onChange={(dAray) => onChangeDateRange(dAray)}
              placeholder="시작날짜 - 종료날짜"
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

export default SearchPeriodBar;
