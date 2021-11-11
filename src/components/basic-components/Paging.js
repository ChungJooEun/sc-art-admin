import React, { useState } from "react";

const Paging = ({ pageNumber, getPageNumber, totalNum, count }) => {
  const goPrevPage = () => {
    getPageNumber(pageNumber - 1);
  };

  const goNextPage = () => {
    getPageNumber(pageNumber + 1);
  };

  const isEndPage = () => {
    if (pageNumber * count >= totalNum) {
      return true;
    }
    return false;
  };

  const [showPaging, setShowPaging] = useState(false);

  const toggleShowPaging = () => {
    setShowPaging(!showPaging);
  };

  const goPickPage = (e) => {
    getPageNumber(parseInt(e.target.innerText));
    toggleShowPaging();
  };

  const drawPaging = () => {
    let pageAry = [];
    let start =
      pageNumber % 5 === 0
        ? parseInt(pageNumber / 5) * 5 - 4
        : parseInt(pageNumber / 5) * 5 + 1;

    let end = isEndPage()
      ? pageNumber
      : pageNumber % 5 === 0
      ? parseInt(pageNumber / 5) * 5
      : (parseInt(pageNumber / 5) + 1) * 5;

    for (let i = start; i <= end; i++) {
      pageAry.push(
        <a
          className={
            i === pageNumber ? "dropdown-item active" : "dropdown-item"
          }
          onClick={(e) => goPickPage(e)}
        >
          {i}
        </a>
      );
    }

    return pageAry;
  };

  return (
    <div className="card-footer p-8pt">
      <ul className="pagination justify-content-start pagination-xsm m-0">
        <li className={pageNumber === 1 ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            aria-label="Previous"
            onClick={() => goPrevPage()}
          >
            <span aria-hidden="true" className="material-icons">
              chevron_left
            </span>
            <span>Prev</span>
          </a>
        </li>
        <li className="page-item dropdown">
          <a
            className="page-link dropdown-toggle"
            onClick={() => {
              toggleShowPaging();
            }}
          >
            <span>{pageNumber}</span>
          </a>
          <div
            className={showPaging ? "dropdown-menu show" : "dropdown-menu"}
            style={{
              top: "0px",
              left: "0px",
              position: "absolute",
              willChange: "transform",
              transform: "translate3d(-1px, -171px, 0px",
            }}
          >
            {drawPaging()}
          </div>
        </li>
        <li className={isEndPage() ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            aria-label="Next"
            onClick={() => goNextPage()}
          >
            <span>Next</span>
            <span aria-hidden="true" className="material-icons">
              chevron_right
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Paging;
