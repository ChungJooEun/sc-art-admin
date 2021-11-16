import React from "react";
import ModifiableEventListItem from "./ModifiableEventListItem";

const ModifiableEventList = ({ list, pageNumber, count, sorting }) => {
  let no = (pageNumber - 1) * count + 1;

  return (
    <div
      className="table-responsive"
      data-toggle="lists"
      data-lists-sort-by="js-lists-values-date"
      data-lists-sort-desc="true"
      data-lists-values={
        ("js-lists-values-lead",
        "js-lists-values-project",
        "js-lists-values-status",
        "js-lists-values-budget",
        "js-lists-values-date")
      }
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
            <th style={{ width: "80px" }}>
              <span onClick={() => sorting("address1")} className="sort">
                위치
              </span>
            </th>
            <th style={{ width: "48px" }}>
              <span onClick={() => sorting("price")} className="sort">
                비용
              </span>
            </th>
            <th style={{ width: "64px" }}>
              <span onClick={() => sorting("create_date")} className="sort">
                등록일
              </span>
            </th>
            <th style={{ width: "64px" }}>
              <span onClick={() => sorting("close_date")} className="sort">
                마감일
              </span>
            </th>
            <th style={{ width: "64px" }}>
              <span onClick={() => sorting("create_uid")} className="sort">
                작성자
              </span>
            </th>
            <th style={{ width: "120px" }}>
              <span onClick={() => sorting("state")} className="sort">
                상태
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="list" id="staff">
          {list.map((eventInfo) => (
            <ModifiableEventListItem
              eventInfo={eventInfo}
              key={eventInfo.id}
              no={no++}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ModifiableEventList;
