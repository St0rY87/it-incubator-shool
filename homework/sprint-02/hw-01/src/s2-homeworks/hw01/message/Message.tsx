import React from "react";
import s from "./Message.module.css";
import type { MessagePropsType as MessageType } from "../HW1";
// нужно создать правильный тип вместо any

type MessagePropsType = {
  message: MessageType;
};

// нужно отобразить приходящие данные
const Message = ({ message }: MessagePropsType) => {

  const {id, user, message: messageContent} = message;

  return (
    <div id={"hw1-message-" + id} className={s.message}>
      <div className={s.imageAndText}>
        <img
          id={"hw1-avatar-" + id}
          src={user.avatar}
        />
        <div className={s.text}>
          <div id={"hw1-name-" + id} className={s.name}>
            <span>{user.name}</span>
          </div>
          <pre id={"hw1-text-" + id} className={s.messageText}>
            {messageContent.text}
          </pre>
        </div>
      </div>
      <div id={"hw1-time-" + id} className={s.time}>
        {messageContent.time}
      </div>
    </div>
  );
};

export default Message;
