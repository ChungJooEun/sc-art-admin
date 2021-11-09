import React from "react";

import UserListItem from "./UserListItem";

const UserList = () => {
  return (
    <table className="table mb-0 thead-border-top-0 table-nowrap">
      <thead>
        <tr>
          <th style={{ width: "12px" }}>no.</th>
          <th style={{ width: "80px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-userid"
            >
              아이디
            </a>
          </th>
          <th style={{ width: "48px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-username"
            >
              이름
            </a>
          </th>
          <th style={{ width: "80px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-cellphone"
            >
              전화번호
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-lastupdate"
            >
              최종접속일
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-email"
            >
              이메일
            </a>
          </th>
          <th style={{ width: "64px" }}>
            <a
              href="javascript:void(0)"
              className="sort"
              data-sort="js-lists-values-birthday"
            >
              생년월일
            </a>
          </th>
        </tr>
      </thead>
      <tbody className="list" id="staff">
        <UserListItem />
        <UserListItem />
        <UserListItem />
        <UserListItem />
        <UserListItem />
      </tbody>
    </table>
  );
};

export default UserList;
