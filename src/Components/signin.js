import React, { useState , useEffect } from "react";
import io from "socket.io-client";
import {socket} from '../Utils/sockets'

export default function SignIn(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const joinRoomHandler = () => {
    socket.emit("joinRoomEventFE", { name, room }, (msg) => {
      alert(msg);
      console.log(props);
      props.history.push(`/chats/${name}/${room}`);
    });
    
  };
  
  return (
    <div className="sign-in__container">
      <label htmlFor="">Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      <label htmlFor="">Room</label>
      <input type="text" onChange={(e) => setRoom(e.target.value)} value={room} />
      <button onClick={joinRoomHandler}>Join Room</button>
    </div>
  );
}
