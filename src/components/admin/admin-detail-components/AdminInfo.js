import React from "react";

const AdminInfo = () => {
  return (
    <table className="table mb-0 thead-border-top-0 table-nowrap user-table">
      <tbody className="list" id="staff">
        <tr>
          <td className="user-table-title">관리자 ID</td>
          <td>IDnumber</td>
        </tr>
        <tr>
          <td className="user-table-title">그룹명</td>
          <td>슈퍼관리자</td>
        </tr>
        <tr>
          <td className="user-table-title">연락처</td>
          <td>000-0000-0000</td>
        </tr>
        <tr>
          <td className="user-table-title">메모</td>
          <td>메모내용입니다</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AdminInfo;
