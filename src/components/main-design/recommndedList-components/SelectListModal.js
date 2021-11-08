import React from "react";

import Paging from "../../basic-components/Paging";

const SelectListModal = ({ CheckableListComponent, closeModal }) => {
  return (
    <div className="modal" style={{ display: "block", background: "#fff" }}>
      <div
        className="modal_content"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <button
          className="modal-btn"
          id="modal-btn"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            border: "1px solid #313131",
          }}
          onClick={() => closeModal()}
        >
          X
        </button>
        <div
          className="modal-title"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <h3 style={{ marginRight: "200px" }}>총 140건 / 선택6건</h3>
          <div className="modal-serch-bar" style={{ marginRight: "40px" }}>
            <span>행사명</span>
            <input type="text" />
            <button className="btn-wraning">검색</button>
          </div>
        </div>

        <CheckableListComponent />
        <Paging />
        <div className="btn-wrap" style={{ textAlign: "center" }}>
          <a>
            <button className="btn btn-primary">가져오기</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SelectListModal;
