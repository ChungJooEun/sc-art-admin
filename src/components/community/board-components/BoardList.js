import React from "react";
import BoardListItem from "./BoardListItem";

const BoardList = () => {
  return (
    <table class="table mb-0 thead-border-top-0 table-nowrap">
      <thead>
        <tr>
          <th style={{ width: "12px" }} class="pr-0">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input js-toggle-check-all"
                data-target="#staff"
                id="customCheckAllstaff"
              />
              <label class="custom-control-label" for="customCheckAllstaff">
                <span class="text-hide">Toggle all</span>
              </label>
            </div>
          </th>
          <th style={{ width: "12px" }}>no.</th>
          <th style={{ width: "150px" }}>
            <a
              href="javascript:void(0)"
              class="sort"
              data-sort="js-lists-values-cultural-seocho-festival-name"
            >
              제목
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              class="sort"
              data-sort="js-lists-values-last-update-date"
            >
              담당자
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              class="sort"
              data-sort="js-lists-values-employee-name"
            >
              문의처
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              class="sort"
              data-sort="js-lists-values-staus"
            >
              파일첨부
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              class="sort"
              data-sort="js-lists-values-public"
            >
              조회수
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              class="sort"
              data-sort="js-lists-values-public"
            >
              등록일
            </a>
          </th>
        </tr>
      </thead>
      <tbody class="list" id="staff">
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
        <BoardListItem />
      </tbody>
    </table>
  );
};

export default BoardList;
