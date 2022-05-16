import React from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarOption.css";
function SidebarOption({ Icon, title, number, selected, url }) {
  const navigate = useNavigate();
  return (
    <div
      className={`sidebarOption ${selected && "sidebarOption__active"} `}
      onClick={() => navigate(url)}
    >
      <Icon />
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}

export default SidebarOption;
