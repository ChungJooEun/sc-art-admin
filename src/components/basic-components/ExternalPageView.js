import React, { useRef, useContext, useEffect } from "react";
import ExternalHtmlContext from "../../context/externalHtml";

const ExternalPageView = () => {
  const { state } = useContext(ExternalHtmlContext);
  const containerRef = useRef();

  const makeHtml = () => {
    console.log(state.externalHtml);

    return {
      __html: `${state.externalHtml}`,
    };
  };

  useEffect(() => {
    const containerEl = containerRef.current;

    if (containerEl) {
      const scripts = containerEl.getElementsByTagName("script");
      for (const script of scripts) {
        window.eval(script.innerHTML);
      }
    }
  });

  return <div ref={containerRef} dangerouslySetInnerHTML={makeHtml()} />;
};

export default ExternalPageView;
