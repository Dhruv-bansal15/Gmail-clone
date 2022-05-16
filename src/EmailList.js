import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RedoIcon from "@mui/icons-material/Redo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";
import Section from "./Section";
import EmailRow from "./EmailRow";
import { db } from "./firebase";
import {
  doc,
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useLocation } from "react-router-dom";

function EmailList({ sent }) {
  const [emails, setEmails] = useState([]);
  const user = useSelector(selectUser);
  const location = useLocation()
  useEffect(() => {
    // db.collection("emails")
    //   .orderBy("timestamp", "desc")
    //   .onSnapshot((snapshot) =>
    //     setEmails(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data(),
    //       }))
    //     )
    //   );
    // console.log("first")
    const type = sent ? "from" : "to";
    const unsub = onSnapshot(
      query(collection(db, "emails"), where(type, "==", user.email)),
      (snapshot) => {
        // console.log(snapshot);
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );

    return () => unsub();
  }, [location.pathname]);

  // console.log(emails);
  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList__sections">
        <Section Icon={InboxIcon} title="primary" color="red" selected={true} />
        <Section
          Icon={PeopleIcon}
          title="Social"
          color="#1A73EB"
          selected={false}
        />
        <Section
          Icon={LocalOfferIcon}
          title="Promotions"
          color="green"
          selected={false}
        />
      </div>
      <div className="emailList__list">
        {emails.map(({ id, data: { from, subject, message, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={from}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
}

export default EmailList;
