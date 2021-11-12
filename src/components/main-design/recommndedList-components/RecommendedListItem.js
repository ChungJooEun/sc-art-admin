import React from "react";

const RecommendedListItem = () => {
  return (
    <div className="col-sm-6 col-md-4 card-group-row__col">
      <div className="card card-sm card-group-row__card">
        <div className="position-relative">
          <div className="card-img-top">
            <img
              src="../assets/images/stories/256_rsz_thomas-russell-751613-unsplash.jpg"
              className="card-img-top card-img-cover"
              alt=""
            />
          </div>
        </div>
        <div className="card-body d-flex">
          <div className="flex">
            <h5 className="card-title m-0">
              <a href="/..event/event-detail.html">문화행사/공간 이름</a>
            </h5>
            <small className="text-muted">주소</small>
            <div
              className="navbar navbar-expand x-0 navbar-light bg-body"
              id="default-navbar"
              data-primary=""
            >
              <label
                id="label-question"
                htmlFor="question"
                className="col-md-3 col-form-label form-label"
              >
                순서
              </label>
              <div className="col-md-5">
                <form className="d-none d-md-flex">
                  <select
                    id="custom-select"
                    className="form-control custom-select"
                  >
                    <option selected="">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                  </select>
                </form>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedListItem;
