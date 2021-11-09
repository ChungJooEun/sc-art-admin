import React from "react";

const AdminListItem = () => {
  return (
    <tr>
      <td className="js-lists-values-number small">3</td>
      <td>
        <a
          onClick={() => (window.location.href = "/admin/admin-account-detail")}
          className="js-lists-values-a"
        >
          이름
        </a>
      </td>
      <td className="js-lists-values-b small">일반 관리자</td>
      <td className="js-lists-values-c small">등록자</td>
      <td className="js-lists-values-d small">2021.01.01</td>
      <td className="js-lists-values-e small">2021.01.01</td>
      <td className="js-lists-values-f small">000-0000-0000</td>
      <td className="js-lists-values-g small">메모메모</td>
      <td className="js-lists-values-h small">
        <button
          className="btn btn-warning ml-16pt"
          data-toggle="swal"
          data-swal-title="정말 삭제 하시겠습니까??"
          data-swal-text="이 동작은 다시 되돌릴 수 없습니다."
          data-swal-type="warning"
          data-swal-show-cancel-button="true"
          data-swal-confirm-button-text="확인"
          data-swal-confirm-cb="#swal-confirm-delete"
          data-swal-close-on-confirm="false"
        >
          삭제
        </button>
        <div
          id="swal-confirm-delete"
          className="d-none"
          data-swal-type="success"
          data-swal-title="삭제완료"
          data-swal-text="삭제 완료되었습니다."
        ></div>
      </td>
    </tr>
  );
};
export default AdminListItem;
