import React, { createContext, useState } from "react";

const ExternalHtmlContext = createContext({
  state: {
    externalHtml: "",
  },
  actions: {
    setExternalHtml: () => {},
  },
});

const ExternalHtmlProvider = ({ children }) => {
  const [externalHtml, setExternalHtml] = useState("");

  const value = {
    state: { externalHtml },
    actions: { setExternalHtml },
  };

  return (
    <ExternalHtmlContext.Provider value={value}>
      {children}
    </ExternalHtmlContext.Provider>
  );
};

const { Consumer: ExternalHtmlComsuner } = ExternalHtmlContext;

export { ExternalHtmlProvider, ExternalHtmlComsuner };

export default ExternalHtmlContext;
