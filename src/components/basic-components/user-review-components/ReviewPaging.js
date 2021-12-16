import React, { useState, useEffect } from "react";

const calcLastPage = (itemNum, onePage) => {
  if (itemNum % onePage === 0) {
    return parseInt(itemNum / onePage);
  } else {
    return parseInt(itemNum / onePage) + 1;
  }
};

const ReviewPaging = React.memo(({ curPage, getCurPage, onePage, all }) => {
  const [lastpage, setLastPage] = useState(1);

  const onClickPageNumber = (e) => {
    getCurPage(parseInt(e.target.innerText));
  };

  const calcFirstPage = () => {
    if (curPage % onePage === 0) {
      return (parseInt(curPage / onePage) - 1) * onePage;
    } else {
      return curPage - parseInt(curPage % onePage) + 1;
    }
  };

  const calcEndPage = () => {
    let endpage = (parseInt(curPage / onePage) + 1) * onePage;
    if (endpage >= lastpage) {
      return lastpage;
    } else {
      return endpage;
    }
  };

  const paging = () => {
    let pageAry = [];

    for (let i = calcFirstPage(); i <= calcEndPage(); i++) {
      pageAry.push(
        <li
          className={curPage === i ? "page-item active" : "page-item"}
          key={i}
        >
          <a
            className="page-link"
            onClick={(e) => {
              onClickPageNumber(e);
            }}
            aria-label={i}
          >
            <span>{i}</span>
          </a>
        </li>
      );
    }

    return pageAry;
  };

  const goFirstPage = () => {
    if (curPage === 1) return;

    getCurPage(1);
  };

  const goPrevPage = () => {
    if (curPage === 1) return;

    getCurPage(curPage - 1);
  };

  const goNextPage = () => {
    if (curPage === lastpage) {
      return;
    }

    getCurPage(curPage + 1);
  };

  const goLastPage = () => {
    if (curPage === lastpage) {
      return;
    }

    getCurPage(lastpage);
  };

  useEffect(() => {
    const lastpage = calcLastPage(all, onePage);

    setLastPage(lastpage);
  }, [all, onePage]);

  return (
    <ul className="pagination pagination-sm mt-24pt">
      <li className={curPage === 1 ? "page-item disabled" : "page-item"}>
        <a className="page-link" onClick={goFirstPage} aria-label="Previous">
          <span aria-hidden="true" className="material-icons">
            first_page
          </span>
          <span className="sr-only">First</span>
        </a>
      </li>

      <li className={curPage === 1 ? "page-item disabled" : "page-item"}>
        <a className="page-link" onClick={goPrevPage} aria-label="Previous">
          <span aria-hidden="true" className="material-icons">
            chevron_left
          </span>
          <span className="sr-only">Prev</span>
        </a>
      </li>

      {paging()}
      <li className={curPage === lastpage ? "page-item disabled" : "page-item"}>
        <a className="page-link" onClick={goNextPage} aria-label="Next">
          <span className="sr-only">Next</span>
          <span aria-hidden="true" className="material-icons">
            chevron_right
          </span>
        </a>
      </li>

      <li className={curPage === lastpage ? "page-item disabled" : "page-item"}>
        <a className="page-link" onClick={goLastPage} aria-label="Next">
          <span className="sr-only">Last</span>
          <span aria-hidden="true" className="material-icons">
            last_page
          </span>
        </a>
      </li>
    </ul>
  );
});

export default React.memo(ReviewPaging);
