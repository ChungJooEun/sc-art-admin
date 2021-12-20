import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import StatisticalTableItem from "./StatisticalTableItem";
import Paging from "../../basic-components/Paging";

const count = 5;

const StatisticalTable = ({ period }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const getPageNumber = (pickNumber) => {
    setPageNumber(pickNumber);
  };

  const [totalRows, setTotalRows] = useState(0);
  const [eventList, setEventList] = useState([]);

  const [sortInfo, setSortInfo] = useState({
    sortColumn: "create_date",
    sortType: "desc",
  });

  const sorting = (columnName) => {
    if (columnName === sortInfo.sortColumn) {
      setSortInfo({
        ...sortInfo,
        sortType: sortInfo.sortType === "desc" ? "asc" : "desc",
      });
    } else {
      setSortInfo({
        sortColumn: columnName,
        sortType: "desc",
      });
    }
  };

  let no = count * pageNumber;

  const getEventList = useCallback(async () => {
    const url =
      "https://culture.seocho.go.kr:8443/cultural-service/api/v2/admin/stat/event/all";
    try {
      const res = await axios.get(url, {
        params: {
          page: pageNumber,
          rows: count,
          openDate: period.from_date,
          closeDate: period.to_date,
          sortColumn: sortInfo.sortColumn,
          sortType: sortInfo.sortType,
        },
      });

      if (res.status === 200) {
        const { totalRows, data } = res.data;
        setTotalRows(totalRows);

        let ary = [];
        for (let i = 0; i < data.length; i++) {
          ary.push({
            id: data[i].id,
            title: data[i].name,
            eventType: data[i].eventType,
            location: data[i].location,
            averageScore: data[i].averageScore.toString().includes(".")
              ? data[i].averageScore
              : data[i].averageScore + ".0",
            totalReviewRows: data[i].totalReviewRows,
            totalLikeRows: data[i].totalLikeRows,
            viewCount: data[i].viewCount,
          });
        }
        setEventList(ary);
      }
    } catch (e) {
      console.log(e);
    }
  }, [period, sortInfo, pageNumber]);

  useEffect(() => {
    getEventList();
  }, [getEventList]);

  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">전체({totalRows})</div>
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
                <th style={{ width: "12px" }}>no.</th>
                <th style={{ width: "150px" }}>
                  <span onClick={() => sorting("name")} className="sort">
                    행사명
                  </span>
                </th>
                <th style={{ width: "48px" }}>
                  <span onClick={() => sorting("event_type")} className="sort">
                    종류
                  </span>
                </th>
                <th style={{ width: "92px" }}>
                  <span onClick={() => sorting("location")} className="sort">
                    위치
                  </span>
                </th>
                <th style={{ width: "64px" }}>
                  <span
                    onClick={() => sorting("average_score")}
                    className="sort"
                  >
                    총 평점
                  </span>
                </th>
                <th style={{ width: "64px" }}>
                  <span
                    onClick={() => sorting("total_review_count")}
                    className="sort"
                  >
                    리뷰 수
                  </span>
                </th>
                <th style={{ width: "64px" }}>
                  <span
                    className="sort"
                    onClick={() => sorting("total_like_count")}
                  >
                    하트 수
                  </span>
                </th>
                <th style={{ width: "64px" }}>
                  <span className="sort" onClick={() => sorting("view_count")}>
                    클릭 수
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="list" id="staff">
              {eventList.map((eventInfo) => (
                <StatisticalTableItem
                  eventInfo={eventInfo}
                  no={no--}
                  key={eventInfo.id}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* api 완성시, Paging 컴포넌트로 바꾸기 */}
        <Paging
          pageNumber={pageNumber}
          getPageNumber={getPageNumber}
          totalNum={totalRows}
          count={count}
        />
      </div>
    </>
  );
};

export default StatisticalTable;
