import React from "react";

const UserListItem = () => {
  return (
    <tr>
      <td className="js-lists-values-place small">1</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <p className="mb-0">
                <a onClick={() => (window.location.href = "/user/user-detail")}>
                  <strong className="js-lists-values-cultural-userid">
                    아이디
                  </strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a href="" className="js-lists-values-username">
          이름
        </a>
      </td>
      <td className="js-lists-values-cellphone small">000-0000-0000</td>
      <td className="js-lists-values-lastupdate small">2021.07.12</td>
      <td className="js-lists-values-registration-email small">
        email@email.com
      </td>
      <td className="js-lists-values-birthday small">0000.00.00</td>
    </tr>
  );
};

export default UserListItem;
