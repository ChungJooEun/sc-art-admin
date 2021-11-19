import React, { useState, useRef } from "react";

const BannerAddForm = ({ getBannerInfo }) => {
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [link, setLink] = useState("");

  const fileInput = useRef();

  const onChangeImgFile = (e) => {
    const imgFileAry = e.target.files;

    setImgBase64([]);
    setImgFile(imgFileAry);

    for (let i = 0; i < imgFileAry.length; i++) {
      if (imgFileAry[i]) {
        let reader = new FileReader();

        // 1. 파일 읽어서 버퍼에 저장
        reader.readAsDataURL(imgFileAry[i]);

        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 읽기 완료시, 아래 코드 실행
          const base64 = reader.result;

          if (base64) {
            var base64Sub = base64.toString();

            // 파일 base64 상태 업데이트
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  const onChangeLink = (e) => {
    setLink(e.target.value);
  };

  const onClickAddBtn = () => {
    getBannerInfo(imgFile, link, imgBase64);

    // 초기화
    setLink("");
    setImgFile(null);
    setImgBase64([]);
    // fileInput.current.value = "";
  };

  return (
    <div className="col-lg-12">
      <div className="list-group">
        <div className="list-group-item">
          <div
            role="group"
            aria-labelledby="label-question"
            className="m-0 form-group"
          >
            <div className="form-row align-items-center">
              <label
                id="label-question"
                htmlFor="question"
                className="col-md-2 col-form-label form-label"
              >
                배너 이미지
              </label>
              <div className="col-md-10">
                <input
                  type="file"
                  accept="image/*"
                  className=""
                  // id="customFileUploadMultiple"
                  onChange={(e) => {
                    onChangeImgFile(e);
                  }}
                  ref={fileInput}
                />
                <label className="" htmlFor="customFileUploadMultiple"></label>
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label
              id="label-question"
              htmlFor="question"
              className="col-md-2 col-form-label form-label"
            >
              링크주소
            </label>
            <div className="col-md-9">
              <input
                id="maskSample01"
                type="text"
                className="form-control"
                placeholder="www.site.com"
                value={link}
                onChange={(e) => {
                  onChangeLink(e);
                }}
                autoComplete="off"
              />
            </div>
            <div className="d-none d-md-flex">
              <button
                type="buttom"
                className="btn btn-primary"
                onClick={() => onClickAddBtn()}
              >
                추가{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAddForm;
