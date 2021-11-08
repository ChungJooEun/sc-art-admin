import React from "react";
import ModifiablePlaceListItem from "./ModifiablePlaceListItem";

const ModifiablePlaceList = () => {
  return (
    <div
      className="table-responsive"
      data-toggle="lists"
      data-lists-sort-by="js-lists-values-date"
      data-lists-sort-desc="true"
      data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
    >
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        <thead>
          <tr>
            <th style={{ width: "12px" }}>no.</th>
            <th style={{ width: "150px" }}>
              <a
                href="javascript:void(0)"
                className="sort"
                data-sort="js-lists-values-cultural-event"
              >
                행사명
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
            <th style={{ width: "120px" }}>
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
          <ModifiablePlaceListItem />
          <ModifiablePlaceListItem />
          <ModifiablePlaceListItem />
          <ModifiablePlaceListItem />
          <ModifiablePlaceListItem />
        </tbody>
      </table>
    </div>
  );
};
export default ModifiablePlaceList;
