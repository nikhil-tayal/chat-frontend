import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import {socket} from '../Utils/sockets'

socket.on("newUserAddedBackend", () => {
  console.log("newUserAddedBackend");
});

export default function Chats(props) {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const inputEl = useRef(null);
  const sendMessageEvent = () => {
    socket.emit("sendMessageFromFE", message, moment().utcOffset(330).format("hh:m a"), props.match.params.name);
    setMessage("");
    inputEl.current.focus();
  };
  useEffect(() => {
    socket.on("sendMessageFromBE", (messageBE, date, name) => {
      setMessageArray((messageArray) => [...messageArray, { messageBE, date, name }]);
    });
  }, []);

  const move = (e)=>{
    if(e.keyCode===13){
      sendMessageEvent()
    }
  }
  return (
    <div className="container chat__wrapper" onKeyDown={(e) => move(e)}>
      <ScrollToBottom className="auto-scroll">
        <div className="messages__container">
          {messageArray.map((el, index) => (
            <>
              <div className="message-sender__name">
                {el.name}
                <span className="message-time">{el.date}</span>
              </div>
              <div className="message">{el.messageBE}</div>
            </>
          ))}
        </div>
      </ScrollToBottom>
      <div className="bottom__button">
        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} ref={inputEl} />
        <button onClick={sendMessageEvent}>Send</button>
        <button>Send Location</button>
      </div>
    </div>
  );
}
