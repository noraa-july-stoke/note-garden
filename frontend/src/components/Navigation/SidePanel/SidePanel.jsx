// eslint-disable-next-line
import React, { useContext } from "react";

import PanelTab from "./PanelTab";
import { ColorContext } from "../../../context/ColorContext";

import "./SidePanel.css";

const SidePanel = ({ panelItems, children}) => {
  const { bgColor } = useContext(ColorContext);
  return (
    <div className="side-panel-container" style={{ backgroundColor: bgColor }}>
      {children}
      <div className="tabs-container">
          {panelItems?.map((item) => {
            return <PanelTab item={item} />;
          })}
      </div>
    </div>
  );
};

export default SidePanel;
