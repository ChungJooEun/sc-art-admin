import React from "react";

const UserReviewListItem = () => {
  return (
    <div className="card mb-lg-0">
      <div className="card-header d-flex align-items-center">
        <h5 className="flex">공간/행사 제목</h5>
        <button className="btn btn btn-secondary ml-16pt">숨기기 취소</button>
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
        <div className="user-review-tab-menu">
          <h6 className="m-0">종류</h6>
          <p className="text-50 mb-0 d-flex align-items-center">공연</p>
        </div>
        <div className="user-review-tab-menu">
          <h6 className="m-0">행사장</h6>
          <p className="text-50 mb-0 d-flex align-items-center">양재문화재단</p>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li>
            <b>username</b>
            <b className="material-icons sidebar-menu-icon sidebar-menu-icon--left material-icons-yellow">
              star
            </b>
            <b className="material-icons sidebar-menu-icon sidebar-menu-icon--left material-icons-yellow">
              star
            </b>
            <b className="material-icons sidebar-menu-icon sidebar-menu-icon--left material-icons-yellow">
              star
            </b>
            <b className="material-icons sidebar-menu-icon sidebar-menu-icon--left material-icons-yellow">
              star_border
            </b>
            <b className="material-icons sidebar-menu-icon sidebar-menu-icon--left material-icons-yellow">
              star_border
            </b>
            3점
          </li>
          <li>리뷰 내용입니다</li>
        </ul>
      </div>
    </div>
  );
};

export default UserReviewListItem;
