import React from "react";

const PublicApiInfoEventListItem = () => {
  return (
    <tr>
      <td className="js-lists-values-place small">2</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <img
                src="../assets/images/256_rsz_thomas-russell-751613-unsplash.jpg"
                className="avatar-img rounded"
                alt=""
                data-dz-thumbnail
              />
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <a
                href="../event/event-db-detail.html"
                className="mb-0 txt_line_table_title"
              >
                <strong className="js-lists-values-cultural-event">
                  행사이름행사이름행사이름행사이름행사이름행사이름행사이름행사이름
                </strong>
              </a>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a className="chip chip-outline-secondary js-lists-values-tag">기타</a>
      </td>
      <td className="js-lists-values-place small">장소1</td>
      <td className="js-lists-values-price small">₩12,402</td>
      <td className="js-lists-values-registration-date small">2021.07.12</td>
      <td className="js-lists-values-deadline small">2021.07.12</td>
      <td className="js-lists-values-status small">
        <select id="select01" data-toggle="select" className="form-control">
          <option selected="">미 게시</option>
          <option>게시</option>
        </select>
      </td>
    </tr>
  );
};

export default PublicApiInfoEventListItem;
