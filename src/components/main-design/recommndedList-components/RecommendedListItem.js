import React from "react";

const RecommendedListItem = ({
  listItem,
  totalCount,
  deletItem,
  getSortNumber,
}) => {
  const getImgSrc = (imgSrc) => {
    if (imgSrc !== null) {
      if (imgSrc.includes("/images/")) {
        return `https://culture.seocho.go.kr:3000${imgSrc}`;
      } else {
        return `${process.env.PUBLIC_URL}/assets/images/stories/256_rsz_thomas-russell-751613-unsplash.jpg`;
      }
    } else {
      return `${process.env.PUBLIC_URL}/assets/images/stories/256_rsz_thomas-russell-751613-unsplash.jpg`;
    }
  };

  const onChangeSortNumber = (e) => {
    getSortNumber(listItem.id, e.target.value);
  };

  const getOptions = () => {
    let ary = [];
    for (let i = 1; i <= totalCount; i++) {
      ary.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return ary;
  };

  return (
    <div className="col-sm-6 col-md-4 card-group-row__col">
      <div className="card card-sm card-group-row__card">
        <div className="position-relative">
          <div className="card-img-top">
            <img
              src={getImgSrc(listItem.image)}
              className="card-img-top card-img-cover"
              alt=""
            />
          </div>
        </div>
        <div className="card-body d-flex">
          <div className="flex">
            <h5 className="card-title m-0">
              <a href="/..event/event-detail.html">{listItem.name}</a>
            </h5>
            <small className="text-muted">{listItem.location}</small>
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
                    defaultValue={listItem.sort}
                    onChange={(e) => onChangeSortNumber(e)}
                  >
                    {getOptions()}
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
                onClick={() => deletItem(listItem.id)}
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
