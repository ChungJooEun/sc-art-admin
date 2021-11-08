import Rect from "react";

const CheckableScEventListItem = () => {
  return (
    <tr className="selected">
      <td className="pr-0">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input js-check-selected-row"
            checked=""
            id="customCheck1_1"
          />
          <label className="custom-control-label" for="customCheck1_1">
            <span className="text-hide">Check</span>
          </label>
        </div>
      </td>
      <td className="js-lists-values-place small">5</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <p className="mb-0 txt_line_table_title">
                <a href="seocho-festival-detail.html">
                  <strong className="js-lists-values-cultural-seocho-festival-name">
                    축제이름 축제 축제이름
                  </strong>
                </a>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td className="js-lists-values-registration-date small">2021.07.12</td>
      <td className="js-lists-values-last-update-date small">2021.07.12</td>
      <td className="js-lists-values-employer-name small">관리자1</td>
      <td className="js-lists-values-status small">대기 중</td>
      <td className="js-lists-values-public small">게시</td>
    </tr>
  );
};

export default CheckableScEventListItem;
