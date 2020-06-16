import React, { useState } from "react";
import Chats from "./Components/chats";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import SignIn from "./Components/signin";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000");
// socket.on("countUpdated", (count) => {
//   console.log("count value", count);
// });

function App() {
  // const [count, setCount] = useState(0);
  // const [message, setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("");
  // const emitEvent = () => {
  //   setCount(count + 1);
  //   socket.emit("increment", count);
  // };
  // const emitMessageEvent = () => {
  //   socket.emit("userMessageToBackend", message);
  // };
  // socket.on("userMessageToFrontend", (message) => {
  //   setMessageReceived(message);
  // });
  // socket.on("userLocationFrontend", (message) => {
  //   setMessageReceived(message);
  // });
  // const emitLocationEvent = () => {
  //   if (!navigator.geolocation) {
  //     return alert("Browser not support the location services");
  //   }
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     socket.emit("userLocationFrontend", {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //   });
  // };
  console.log("app render");
  return (
    <div className="App">
      {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={emitMessageEvent}>send</button>
      <p>{messageReceived}</p>
      <button onClick={() => emitLocationEvent()}>send location</button> */}
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn}/>
          <Route path="/chats/:name/:room" exact component={Chats}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
