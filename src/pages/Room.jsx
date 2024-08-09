import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import Join from "../components/Join";
import Leave from "../components/Leave";
import VideoPlayer from "../components/VideoPlayer";

const Room = () => {
  const { roomId } = useParams();
  const { stream, peers, createRoom } = useContext(RoomContext);
  console.log("[Client] Room.jsx - Peers", peers);

  useEffect(() => {
    createRoom(roomId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <p>Room ID: {roomId}</p>
      <Join roomId={roomId} />
      <Leave roomId={roomId} />
      <div className="grid grid-cols-4 gap-4">
        <VideoPlayer stream={stream} />
        {Object.values(peers).map((peer) => (
          <VideoPlayer key={peer.id} stream={peer.stream} />
        ))}
      </div>
    </div>
  );
};

export default Room;
