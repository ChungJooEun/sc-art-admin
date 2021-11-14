import React, { useContext } from "react";
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

  const { actions, state } = useContext(EventInfoContext);
  const onChangeEditor = (e) => {
    actions.setDetail(e);
  };

  return (
    <div className="flex" style={{ maxWidth: "100%" }}>
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        modules={moduels}
        formats={formats}
        value={state.detail === undefined ? " " : state.detail}
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
