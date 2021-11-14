import React, { useState, useEffect, useContext } from "react";
import EventInfoContext from "../../../context/eventInfo";
import ReactQuill from "react-quill";
import CustomToolbar from "./CustomToolbar";

const Editor = () => {
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

  const [text, setText] = useState("");

  // const {actions, state} = useContext(EventInfoContext);

  const onChangeEditor = (e) => {
    setText(e);
  };

  // useEffect(() => {
  //   getDetail(text);
  // }, [getDetail, text]);

  return (
    <div className="flex" style={{ maxWidth: "100%" }}>
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        modules={moduels}
        formats={formats}
        value={text === undefined ? " " : text}
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
};

export default Editor;
