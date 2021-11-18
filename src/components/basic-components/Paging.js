import React, { useState } from "react";

const calcLastPage = (itemNum, onePage) => {
  if (itemNum % onePage === 0) {
    return parseInt(itemNum / onePage);
  } else {
    return parseInt(itemNum / onePage) + 1;
  }
};

const Paging = React.memo(({ pageNumber, getPageNumber, totalNum, count }) => {
  const lastPage = calcLastPage(totalNum, count);
  const [showPaging, setShowPaging] = useState(false);

  const toggleShowPaging = () => {
    setShowPaging(!showPaging);
  };

  const calcFirstPage = () => {
    if (pageNumber % count === 0) {
      return (parseInt(pageNumber / count) - 1) * count;
    } else {
      return pageNumber - parseInt(pageNumber % count) + 1;
    }
  };

  const calcEndPage = () => {
    let endpage = (parseInt(pageNumber / count) + 1) * count;
    if (endpage >= lastPage) {
      return lastPage;
    } else {
      return endpage;
    }
  };

  const goPickPage = (e) => {
    getPageNumber(parseInt(e.target.innerText));
    toggleShowPaging();
  };

  const goPrevPage = () => {
    getPageNumber(pageNumber - 1);
  };

  const goNextPage = () => {
    getPageNumber(pageNumber + 1);
  };

  const drawPaging = () => {
    let pageAry = [];

    for (let i = calcFirstPage(); i <= calcEndPage(); i++) {
      pageAry.push(
        <span
          className={
            i === pageNumber ? "dropdown-item active" : "dropdown-item"
          }
          onClick={(e) => goPickPage(e)}
          key={i}
        >
          {i}
        </span>
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
        <li
          className={
            pageNumber === lastPage ? "page-item disabled" : "page-item"
          }
        >
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
});

export default Paging;
