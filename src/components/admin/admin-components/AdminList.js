import React from "react";
import AdminListItem from "./AdminListItem";

const AdminList = () => {
  return (
    <table className="table mb-0 thead-border-top-0 table-nowrap">
      <thead>
        <tr>
          <th style={{ width: "12px" }}>no.</th>
          <th style={{ width: "80px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-a"
            >
              관리자
            </a>
          </th>
          <th style={{ width: "48px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-b"
            >
              그룹명
            </a>
          </th>
          <th style={{ width: "80px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-c"
            >
              등록자
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-d"
            >
              등록일
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-e"
            >
              최종접속일
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-f"
            >
              연락처
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-g"
            >
              메모
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-h"
            >
              관리
            </a>
          </th>
        </tr>
      </thead>
      <tbody className="list" id="staff">
        <AdminListItem />
        <AdminListItem />
        <AdminListItem />
        <AdminListItem />
        <AdminListItem />
      </tbody>
    </table>
  );
};
export default AdminList;
