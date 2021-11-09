import React from "react";

const UserInfo = ({ isEditMode }) => {
  return (
    <>
      <div className="card dashboard-area-tabs mb-32pt">
        <table className="table mb-0 thead-border-top-0 table-nowrap user-table">
          <tbody className="list" id="staff">
            <tr>
              <td className="user-table-title">아이디</td>
              <td>IDnumber</td>
            </tr>
            <tr>
              <td className="user-table-title">이름</td>
              <td>홍길동</td>
            </tr>
            <tr>
              <td className="user-table-title">핸드폰 번호</td>
              <td>000-0000-0000</td>
            </tr>

            {isEditMode ? (
              ""
            ) : (
              <tr>
                <td className="user-table-title">이메일</td>
                <td>{isEditMode ? "" : "email@email.com"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="card dashboard-area-tabs mb-32pt">
        <table className="table mb-0 thead-border-top-0 table-nowrap user-table">
          <tbody className="list" id="staff">
            {isEditMode ? (
              <tr>
                <td className="user-table-title">이메일</td>
                <td>
                  <input
                    id="maskSample02"
                    type="text"
                    className="form-control"
                    placeholder="email@email.com"
                    data-mask="(000) 000-0000"
                    autocomplete="off"
                    maxlength="30"
                  />
                </td>
              </tr>
            ) : (
              ""
            )}
            <tr>
              <td className="user-table-title">생년월일</td>
              <td>
                {isEditMode ? (
                  <input
                    id="flatpickrSample01"
                    type="hidden"
                    className="form-control flatpickr-input"
                    data-toggle="flatpickr"
                    value="2021-08-11"
                  />
                ) : (
                  "2020.01.01"
                )}
              </td>
            </tr>
            <tr>
              <td className="user-table-title">주소</td>
              <td>
                {isEditMode ? (
                  <input
                    id="title"
                    type="text"
                    placeholder="상세주소"
                    className="form-control"
                  />
                ) : (
                  "주소입니다"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInfo;
