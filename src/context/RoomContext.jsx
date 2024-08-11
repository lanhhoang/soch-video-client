import { createContext, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { peerReducer } from "./peerReducer";
import { addPeerAction } from "./peerActions";

export const RoomContext = createContext(null);

const socket = io("https://soch-be.onrender.com");

export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState();
  const [stream, setStream] = useState();
  const [peers, dispatch] = useReducer(peerReducer, {});

  console.log("[Client] Peers", peers);

  const connectSocket = (data) => {
    console.log("[Client] Socket ID", data);
  };

  const enterRoom = ({ roomId }) => {
    console.log(`[Client] Enter room: ${roomId}`);
    navigate(`/therapy-meet/${roomId}`);
  };

  const createRoom = (roomId) => {
    console.log("[Client] Room created", roomId);
    socket.emit("create-room", { roomId });
  };

  const getUsers = (data) => {
    console.log("[Client] Get users", data);
  };

  const joinRoom = (roomId, peerId) => {
    socket.emit("join-room", {
      roomId,
      peerId,
      email: "therapist@example.com",
    });
  };

  const leaveRoom = (roomId, peerId) => {
    socket.emit("leave-room", {
      roomId,
      peerId,
      email: "therapist@example.com",
    });

    navigate("/");
  };

  useEffect(() => {
    const meId = uuidv4(); // user id from database
    const peer = new Peer(meId, {
      host: "soch-webrtc.onrender.com",
      path: "/",
      secure: true,
    });
    setMe(peer);
    console.log("[Client] Me", peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log("[Client] Stream", stream);
          setStream(stream);
        });
    } catch (error) {
      console.error("[Client] Peer error", error);
    }

    socket.on("me", connectSocket);
    socket.on("room-created", enterRoom);
    socket.on("get-users", getUsers);
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    socket.on("user-joined", (data) => {
      console.log("[Client] User joined", data);
      const { peerId } = data;
      const call = stream && me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        console.log("[Client] Peer Stream", peerStream);
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      console.log("[Client] Call", call);
      call.answer(stream);
      call.on("stream", (peerStream) => {
        console.log("[Client] Peer Stream", peerStream);
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  return (
    <RoomContext.Provider
      value={{
        socket,
        me,
        stream,
        peers,
        connectSocket,
        enterRoom,
        createRoom,
        joinRoom,
        leaveRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
