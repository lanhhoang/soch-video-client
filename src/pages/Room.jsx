import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import Join from "../components/Join";
import Leave from "../components/Leave";

const Room = () => {
  const { roomId } = useParams();
  const { socket } = useContext(RoomContext);

  useEffect(() => {
    console.log("[Client] Room created", roomId);
    socket.emit("create-room", { roomId });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <p>Room ID: {roomId}</p>
      <Join roomId={roomId} />
      <Leave roomId={roomId} />
    </div>
  );
};

export default Room;
