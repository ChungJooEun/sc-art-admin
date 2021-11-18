import React from "react";
import CheckableScEventListItem from "./CheckableScEventListItem";

const CheckableScEventList = ({
  list,
  pageNumber,
  count,
  sorting,
  addCheckedList,
  removeNoneCheckedList,
}) => {
  let no = (pageNumber - 1) * count + 1;

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
            <span className="sort" onClick={() => sorting("name")}>
              서초축제 제목
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort" onClick={() => sorting("create_date")}>
              등록일
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort" onClick={() => sorting("create_date")}>
              최근 행사 추가일
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort" onClick={() => sorting("create_uid")}>
              작성자
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort">상태</span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort" onClick={() => sorting("state")}>
              게시여부
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="list" id="staff">
        {list.map((scInfo) => (
          <CheckableScEventListItem
            scInfo={scInfo}
            no={no++}
            key={scInfo.id}
            addCheckedItem={addCheckedList}
            removeCheckedItem={removeNoneCheckedList}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CheckableScEventList;
