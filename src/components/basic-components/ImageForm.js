import React, { useState, useContext } from "react";

const ImageForm = React.memo(() => {
  const [imgBase64, setImgBase64] = useState([]);

  const onChangeImgFile = (e) => {
    const imgFileAry = e.target.files;

    setImgBase64([]);

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

  return (
    <div className="col-lg-4">
      <div className="card mb-lg-0">
        <div className="list-group list-group-flush">
          <div className="list-group-item p-16pt">
            <a className="d-block mb-16pt">
              <img
                src={
                  imgBase64.length === 0
                    ? `${process.env.PUBLIC_URL}/assets/images/stories/256_rsz_jared-rice-388260-unsplash.jpg`
                    : imgBase64[0]
                }
                alt=""
                className="card-img card-img-cover"
              />
            </a>
            <div className="form-row align-items-center">
              <label
                id="label-question"
                for="question"
                className="col-md-2 col-form-label form-label"
              ></label>
              <div className="col-md-10">
                <input
                  type="file"
                  accept="image/*"
                  className=""
                  id="customFileUploadMultiple"
                  onChange={(e) => onChangeImgFile(e)}
                />
                <label className="" for="customFileUploadMultiple"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default React.memo(ImageForm);
