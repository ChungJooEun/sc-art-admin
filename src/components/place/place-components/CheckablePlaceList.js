import React from "react";

import CheckablePlaceListItem from "../place-components/CheckablePlaceListItem";

const CheckablePlaceList = () => {
  return (
    <table className="table mb-0 thead-border-top-0 table-nowrap">
      <thead>
        <tr>
          <th style={{ width: "12px" }} className="pr-0">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input js-toggle-check-all"
                data-target="#staff"
                id="customCheckAllstaff"
              />
              <label className="custom-control-label" for="customCheckAllstaff">
                <span className="text-hide">Toggle all</span>
              </label>
            </div>
          </th>
          <th style={{ width: "12px" }}>no.</th>
          <th style={{ width: "150px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-cultural-event"
            >
              공간
            </a>
          </th>
          <th style={{ width: "48px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-tag"
            >
              종류
            </a>
          </th>
          <th style={{ width: "80px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-place"
            >
              위치
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-registration-date"
            >
              등록일
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-employee-name"
            >
              작성자
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-staus"
            >
              상태
            </a>
          </th>
        </tr>
      </thead>
      <tbody className="list" id="staff">
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
        <CheckablePlaceListItem />
      </tbody>
    </table>
  );
};

export default CheckablePlaceList;
