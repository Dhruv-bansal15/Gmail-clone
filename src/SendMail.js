import React from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { selectUser } from "./features/userSlice";

function SendMail() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    // console.log(formData);

    // v8
    // db.collection('emails').add({
    //   to: formData.to,
    //   subject: formData.subject,
    //   message: formData.message,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // })

    //v9
    addDoc(collection(db, "emails"), {
      to: formData.to,
      from: user.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
    });

    dispatch(closeSendMessage());
  };
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail__close"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to && <p className="sendMail__error">To is Required!</p>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail__error">Subject is Required!</p>
        )}
        <input
          name="message"
          placeholder="Message"
          type="text"
          className="sendMail__message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="sendMail__error">Message is Required!</p>
        )}
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
