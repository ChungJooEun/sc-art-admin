import React from "react";
import PublicApiInfoEventListItem from "./PublicApiInfoEventListItem";

const PublicApiInfoEventList = () => {
  return (
    <table className="table mb-0 thead-border-top-0 table-nowrap">
      <thead>
        <tr>
          <th style={{ width: "12px" }}>no.</th>
          <th style={{ width: "150px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-cultural-event-img"
            >
              대표 이미지
            </a>
          </th>
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
          <th style={{ width: "48px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-price"
            >
              비용
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
              data-sort="js-lists-values-deadline"
            >
              마감일
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
        <PublicApiInfoEventListItem />
        <PublicApiInfoEventListItem />
        <PublicApiInfoEventListItem />
      </tbody>
    </table>
  );
};

export default PublicApiInfoEventList;
