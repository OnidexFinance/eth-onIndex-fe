import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Placement, Padding } from "@popperjs/core";
import { SubMenuContainer, ClickableElementContainer } from "./styles";

export interface SubMenuProps {
  component: React.ReactNode;
  options?: {
    placement?: Placement;
    offset?: [number, number];
    padding?: Padding;
  };
  isOpen?: boolean;
  toggling?: (event: React.MouseEvent<HTMLDivElement>) => void;
  setIsOpen: (val: boolean) => void;
}

const portalRoot = document.getElementById("portal-root");

const SubMenu: React.FC<SubMenuProps> = ({ component, options, children, isOpen, toggling, setIsOpen }) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const placement = options?.placement ?? "bottom";
  const offset = options?.offset ?? [0, 10];
  const padding = options?.padding ?? { left: 16, right: 16 };

  // const [isOpen, setIsOpen] = useState(clicked);

  // const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
  //   setIsOpen(!isOpen);
  //   event.stopPropagation();
  // };

  useEffect(() => {
    const handleClickOutside = ({ target }: Event) => {
      if (target instanceof Node) {
        if (menuElement !== null && !menuElement.contains(target)) {
          setIsOpen(false);
        }
      }
    };
    if (menuElement !== null) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuElement, setIsOpen]);

  const { styles, attributes } = usePopper(targetElement, menuElement, {
    placement,
    modifiers: [
      { name: "offset", options: { offset } },
      { name: "preventOverflow", options: { padding } },
    ],
  });

  const menu = (
    <SubMenuContainer ref={setMenuElement} style={styles.popper} {...attributes.popper}>
      {children}
    </SubMenuContainer>
  );

  const renderMenu = portalRoot ? createPortal(menu, portalRoot) : menu;

  return (
    <div style={{position: "relative"}}>
      <ClickableElementContainer ref={setTargetElement} onClick={toggling}>
        {component}
      </ClickableElementContainer>
      {isOpen && renderMenu}
    </div>
  );
};

export default SubMenu;
