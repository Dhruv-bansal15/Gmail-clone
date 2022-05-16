import { Button, IconButton } from "@mui/material";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";
import SidebarOption from "./SidebarOption";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import NearMeIcon from "@mui/icons-material/NearMe";
import NoteIcon from "@mui/icons-material/Note";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import PersonIcon from "@mui/icons-material/Person";
import DuoIcon from "@mui/icons-material/Duo";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch } from "react-redux";
import { openSendMessage } from "./features/mailSlice";
import {useNavigate, useLocation} from 'react-router-dom'
function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon fontSize="large" />}
        className="sidebar__compose"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>
      <SidebarOption
        Icon={InboxIcon}
        title="Inbox"
        number={54}
        selected={location.pathname === "/"}
        url="/"
      />
      <SidebarOption
        Icon={StarIcon}
        title="Starred"
        number={54}
        url="/"
        selected={false}
      />
      <SidebarOption
        Icon={AccessTimeFilledIcon}
        title="Snoozed"
        url="/"
        number={54}
        selected={false}
      />
      <SidebarOption
        Icon={LabelImportantIcon}
        title="Important"
        url="/"
        number={54}
        selected={false}
      />
      <SidebarOption
        Icon={NearMeIcon}
        title="Sent"
        number={54}
        selected={location.pathname === "/sent"}
        url="/sent"
      />
      <SidebarOption
        Icon={NoteIcon}
        title="Drafts"
        url="/"
        number={54}
        selected={false}
      />
      <SidebarOption
        Icon={ExpandMoreIcon}
        title="More"
        url="/"
        number={54}
        selected={false}
      />

      <div className="sidebar__footer">
        <div className="sidebar__footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
