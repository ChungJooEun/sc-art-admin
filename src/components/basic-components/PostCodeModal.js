import React from "react";
import DaumPostcode from "react-daum-postcode";

const PostCodeModal = ({ getAddress, closeModal }) => {
  const onCompleteInput = (data) => {
    getAddress(data.address);
    closeModal();
  };

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
            <span></span>
          </div>
        </div>

        <DaumPostcode
          style={{
            width: "100%",
            height: "500px",
          }}
          autoClose={true}
          onComplete={(data) => onCompleteInput(data)}
        />
      </div>
    </div>
  );
};

export default PostCodeModal;
