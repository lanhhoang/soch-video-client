import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";

export const RoomContext = createContext(null);

const socket = io("http://localhost:3000");

export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState();

  const connectSocket = () => {
    socket.on("me", (data) => {
      console.log("[Client] Socket ID", data);
    });
  };

  const createRoom = (roomId) => {
    console.log("[Client] Room created", roomId);
    socket.emit("create-room", { roomId });
  };

  const getUsers = () => {
    socket.on("get-users", (data) => {
      console.log("[Client] Get users", data);
    });
  };

  const joinRoom = (roomId, peerId) => {
    socket.emit("join-room", {
      roomId,
      peerId,
      email: "therapist@example.com",
    });

    // socket.on("user-joined", (data) => {
    //   console.log("[Client] User joined", data);
    // });

    getUsers();
  };

  const leaveRoom = (roomId, peerId) => {
    socket.emit("leave-room", {
      roomId,
      peerId,
      email: "therapist@example.com",
    });

    // socket.on("user-left", (data) => {
    //   console.log("[Client] User left", data);
    // });

    getUsers();

    navigate("/");
  };

  useEffect(() => {
    const meId = uuidv4();
    const peer = new Peer(meId);
    setMe(peer);
    console.log("[Client] Me", peer);
  }, []);

  return (
    <RoomContext.Provider
      value={{ socket, me, connectSocket, createRoom, joinRoom, leaveRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
};
