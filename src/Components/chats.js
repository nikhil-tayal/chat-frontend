import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
const socket = io("http://localhost:4000");

socket.on("newUserAddedBackend", () => {
  console.log("newUserAddedBackend");
});

export default function Chats(props) {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const inputEl = useRef(null);
  let name = "no";
  const sendMessageEvent = () => {
    socket.emit("sendMessageFromFE", message, moment().utcOffset(330).format("hh:m a"), name);
    setMessage("");
    inputEl.current.focus();
  };

  useEffect(() => {
    socket.on("sendMessageFromBE", (messageBE, date, name) => {
      console.log(message, date, name);
      setMessageArray((messageArray) => [...messageArray, { messageBE, date, name }]);
    });
  }, []);
  console.log(messageArray);
  return (
    <div className="container chat__wrapper">
      <div className="messages__container">
        {messageArray.map((el, index) => {
          return <div className="message">{el.messageBE}</div>;
        })}
      </div>
      <div className="bottom__button">
        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} ref={inputEl} />
        <button onClick={sendMessageEvent}>Send</button>
        <button>Send Location</button>
      </div>
    </div>
  );
}
