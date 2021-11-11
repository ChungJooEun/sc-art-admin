import React, { useState, useEffect } from "react";

import ReactQuill from "react-quill";
import CustomToolbar from "./CustomToolbar";

const Editor = React.memo(({ more_information, getDetail }) => {
  const moduels = {
    toolbar: {
      container: "#toolbar-container",
    },
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "ordered",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  const [text, setText] = useState(more_information);

  const onChangeEditor = (e) => {
    setText(e);
  };

  useEffect(() => {
    getDetail(text);
  }, [getDetail, text]);

  return (
    <div className="flex" style={{ maxWidth: "100%" }}>
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        modules={moduels}
        formats={formats}
        value={text}
        onChange={(e) => onChangeEditor(e)}
        placeholder="상세소개..."
        formula={true}
        syntax={true}
        style={{
          height: "450px",
          background: "#fff",
        }}
      />
    </div>
  );
});

export default Editor;
