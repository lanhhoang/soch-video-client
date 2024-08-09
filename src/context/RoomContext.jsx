import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";

export const RoomContext = createContext(null);

const socket = io("http://localhost:3000");

export const RoomProvider = ({ children }) => {
  const [me, setMe] = useState();

  useEffect(() => {
    const meId = uuidv4();
    const peer = new Peer(meId);
    setMe(peer);
    console.log("[Client] Me", peer);
  }, []);

  return (
    <RoomContext.Provider value={{ socket, me }}>
      {children}
    </RoomContext.Provider>
  );
};
