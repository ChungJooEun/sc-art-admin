import React, { useState } from "react";

const MainBanner = ({ getMainBannerImg, imgFile }) => {
  const [imgBase64, setImgBase64] = useState([]);

  const onChangeImgFile = (e) => {
    const imgFileAry = e.target.files;

    setImgBase64([]);
    getMainBannerImg(imgFileAry);

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

  const getImgSrc = () => {
    if (imgBase64.length === 1) {
      return imgBase64[0];
    } else if (imgFile) {
      return `http://118.67.154.118:3000${imgFile}`;
      // return `http://localhost:3000${imgSrc}`;
    } else {
      return "/assets/images/256_rsz_thomas-russell-751613-unsplash.jpg";
    }
  };

  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">메인배경</div>
      </div>
      <div className="list-group">
        <div className="list-group-item">
          <div
            role="group"
            aria-labelledby="label-question"
            className="m-0 form-group"
          >
            <div className="form-row">
              <div className="flex" style={{ maxWidth: "100%" }}>
                <img
                  src={getImgSrc()}
                  className="avatar-img rounded"
                  alt=""
                  data-dz-thumbnail
                />
              </div>
            </div>
          </div>
        </div>
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
                이미지
              </label>
              <div className="col-md-10">
                <input
                  type="file"
                  accept="image/*"
                  className=""
                  id="customFileUploadMultiple"
                  onChange={(e) => onChangeImgFile(e)}
                />
                <label className="" htmlFor="customFileUploadMultiple"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
