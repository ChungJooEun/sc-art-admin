import React from "react";
import StatisticalTableItem from "./StatisticalTableItem";

const StatisticalTable = () => {
  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">전체(12)</div>
      </div>
      <div className="card dashboard-area-tabs mb-32pt">
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
                <th style={{ width: "12px" }} className="pr-0">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input js-toggle-check-all"
                      data-target="#staff"
                      id="customCheckAllstaff"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckAllstaff"
                    >
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
                    총 평점
                  </a>
                </th>
                <th style={{ width: "64px" }}>
                  <a
                    href="javascript:void(0)"
                    className="sort"
                    data-sort="js-lists-values-review"
                  >
                    리뷰 수
                  </a>
                </th>
                <th style={{ width: "64px" }}>
                  <a
                    href="javascript:void(0)"
                    className="sort"
                    data-sort="js-lists-values-heart"
                  >
                    하트 수
                  </a>
                </th>
                <th style={{ width: "64px" }}>
                  <a
                    href="javascript:void(0)"
                    className="sort"
                    data-sort="js-lists-values-click"
                  >
                    클릭 수
                  </a>
                </th>
              </tr>
            </thead>
            <tbody className="list" id="staff">
              <StatisticalTableItem />
              <StatisticalTableItem />
              <StatisticalTableItem />
              <StatisticalTableItem />
              <StatisticalTableItem />
            </tbody>
          </table>
        </div>

        {/* api 완성시, Paging 컴포넌트로 바꾸기 */}
        <div className="card-footer p-8pt">
          <ul className="pagination justify-content-start pagination-xsm m-0">
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true" className="material-icons">
                  chevron_left
                </span>
                <span>Prev</span>
              </a>
            </li>
            <li className="page-item dropdown">
              <a
                className="page-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                aria-label="Page"
              >
                <span>1</span>
              </a>
              <div className="dropdown-menu">
                <a href="" className="dropdown-item active">
                  1
                </a>
                <a href="" className="dropdown-item">
                  2
                </a>
                <a href="" className="dropdown-item">
                  3
                </a>
                <a href="" className="dropdown-item">
                  4
                </a>
                <a href="" className="dropdown-item">
                  5
                </a>
              </div>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span>Next</span>
                <span aria-hidden="true" className="material-icons">
                  chevron_right
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StatisticalTable;
