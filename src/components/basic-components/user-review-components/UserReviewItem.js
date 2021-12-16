import React from "react";

const drawStar = (stars) => {
  let ary = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= stars) {
      ary.push(
        <i className="material-icons material-icons-point icon-16pt" key={i}>
          star
        </i>
      );
    } else {
      ary.push(
        <i className="material-icons icon-16pt" key={i}>
          star_border
        </i>
      );
    }
  }

  return ary;
};

const UserReviewItem = ({ reviewInfo, deleteReview }) => {
  const useConfirm = (message = null, onConfirm) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      }
    };
    return confirmAction;
  };

  const onHandleRemoveReivew = () => {
    deleteReview(reviewInfo.id);
  };

  const onClickRemoveBtn = useConfirm(
    "삭제하시겠습니까?\n삭제된 리뷰는 되돌릴 수 없습니다.",
    onHandleRemoveReivew
  );

  return (
    <div className="list-group-item d-flex align-items-start bg-transparent">
      <div className="mr-3 d-flex flex-column align-items-center">
        <a href="../user/user-detail.html" className="avatar avatar-xs mb-2">
          <b className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
            person_pin
          </b>
        </a>
      </div>
      <div className="flex">
        <p className="m-0">
          {drawStar(reviewInfo.stars)}
          <span className="d-flex align-items-center mb-1">
            <a href="../user/user-detail.html" className="text-body">
              <strong>{reviewInfo.user}</strong>
            </a>
            <small className="ml-auto text-muted">{reviewInfo.date}</small>
          </span>
          <span className="d-flex align-items-end">
            <span className="flex mr-3">
              <strong className="text-body mb-1">{reviewInfo.content}</strong>
              <br />
              <small
                className="text-muted"
                style={{
                  maxHeight: "2rem",
                  overflow: "hidden",
                  position: "relative",
                  display: "inlineBlock",
                }}
              ></small>
            </span>
          </span>
          <button
            className="btn btn-warning float-right"
            data-toggle="swal"
            data-swal-title="정말 삭제 하시겠습니까??"
            data-swal-text="이 동작은 다시 되돌릴 수 없습니다."
            data-swal-type="warning"
            data-swal-show-cancel-button="true"
            data-swal-confirm-button-text="확인"
            data-swal-confirm-cb="#swal-confirm-delete"
            data-swal-close-on-confirm="false"
            onClick={() => onClickRemoveBtn()}
          >
            삭제
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserReviewItem;
