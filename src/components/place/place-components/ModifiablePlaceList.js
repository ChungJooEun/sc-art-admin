import React from "react";
import ModifiablePlaceListItem from "./ModifiablePlaceListItem";

const ModifiablePlaceList = ({ list, pageNumber, count, sorting }) => {
  let no = (pageNumber - 1) * count + 1;
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
              <span className="sort" onClick={() => sorting("name")}>
                공간명
              </span>
            </th>
            <th style={{ width: "48px" }}>
              <span className="sort" onClick={() => sorting("space_type")}>
                종류
              </span>
            </th>
            <th style={{ width: "80px" }}>
              <span className="sort" onClick={() => sorting("address1")}>
                위치
              </span>
            </th>
            <th style={{ width: "64px" }}>
              <span className="sort" onClick={() => sorting("create_date")}>
                등록일
              </span>
            </th>
            <th style={{ width: "64px" }}>
              <span className="sort" onClick={() => sorting("create_uid")}>
                작성자
              </span>
            </th>
            <th style={{ width: "120px" }}>
              <span className="sort" onClick={() => sorting("state")}>
                상태
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="list" id="staff">
          {list.map((placeInfo) => (
            <ModifiablePlaceListItem
              key={placeInfo.id}
              placeInfo={placeInfo}
              no={no++}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ModifiablePlaceList;
