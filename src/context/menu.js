import React, { createContext, useState } from "react";

const MenuContext = createContext({
  state: {
    menu: {
      topMenu: 0,
      subMenu: 0,
    },
    subMenu: {
      topMenu1: false,
      topMenu2: false,
      topMenu3: false,
      topMenu4: false,
      topMenu5: false,
    },
  },
  actions: {
    setMenu: () => {},
    setSubMenu: () => {},
  },
});

const MenuProvier = ({ children }) => {
  const [menu, setMenu] = useState({
    topMenu: 0,
    subMenu: 0,
  });

  const [subMenu, setSubMenu] = useState({
    topMenu1: false,
    topMenu2: false,
    topMenu3: false,
    topMenu4: false,
    topMenu5: false,
  });

  const value = {
    state: { menu, subMenu },
    actions: { setMenu, setSubMenu },
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

const { Consumer: MenuConsumer } = MenuContext;

export { MenuProvier, MenuConsumer };

export default MenuContext;
