import React from "react";
import { useHistory } from "react-router-dom";

const BoardListItem = () => {
  const history = useHistory();

  const getDetailUrl = () => {
    const curUrl = window.location.href;

    if (curUrl.includes("notice")) {
      return "/community/notice-board-detail";
    } else if (curUrl.includes("event")) {
      return "/community/event-board-detail";
    } else {
      return "/community/news-board-detail";
    }
  };

  return (
    <tr className="selected">
      <td className="pr-0">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input js-check-selected-row"
            id="customCheck1_2"
          />
          <label className="custom-control-label" htmlFor="customCheck1_2">
            <span className="text-hide">Check</span>
          </label>
        </div>
      </td>
      <td className="js-lists-values-place small">1</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <p className="mb-0 txt_line_table_title">
                <a onClick={() => history.push(getDetailUrl())}>
                  <strong className="js-lists-values-cultural-seocho-festival-name">
                    공지사항
                  </strong>
                </a>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td className="js-lists-values-registration-date small">담당자명</td>
      <td className="js-lists-values-last-update-date small">문의처명</td>
      <td className="js-lists-values-employer-name small">파일첨부</td>
      <td className="js-lists-values-status small">125</td>
      <td className="js-lists-values-public small">21.07.30</td>
    </tr>
  );
};

export default BoardListItem;
