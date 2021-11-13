import React from "react";
import { useHistory } from "react-router-dom";

const RelatedSiteListItem = () => {
  const history = useHistory();
  return (
    <li
      style={{
        listStyle: "none",
        textAlign: "center",
        marginLeft: "15px",
        marginRight: "15px",
      }}
    >
      <img src="../img/site2.PNG" style={{ width: "110px" }} />
      <div className="link">www.site.com</div>
      <button
        className="btn btn-success"
        type="button"
        onClick={() => history.push("/related-sites/edit-related-sites")}
      >
        수정하기
      </button>

      <button
        className="btn btn-warning ml-16pt"
        data-toggle="swal"
        data-swal-title="정말 삭제 하시겠습니까?"
        data-swal-text="이 동작은 다시 되돌릴 수 없습니다."
        data-swal-type="warning"
        data-swal-show-cancel-text="true"
        data-swal-confirm-button-text="네"
        data-swal-confirm-cb="#swal-confirm-delete"
        data-swal-close-on-confirm="false"
      >
        삭제
      </button>
    </li>
  );
};

export default RelatedSiteListItem;
