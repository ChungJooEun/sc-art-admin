import React from "react";
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

  const onChangeEditor = (e) => {};

  return (
    <div className="flex" style={{ maxWidth: "100%" }}>
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        modules={moduels}
        formats={formats}
        value={""}
        onChange={(e) => onChangeEditor(e)}
        placeholder="μμΈμκ°..."
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
