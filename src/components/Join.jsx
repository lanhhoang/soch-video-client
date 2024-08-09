import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const Join = ({ roomId }) => {
  const { socket, me } = useContext(RoomContext);

  const joinRoom = () => {
    socket.emit("join-room", {
      roomId,
      peerId: me._id,
      email: "therapist@example.com",
    });

    // socket.on("user-joined", (data) => {
    //   console.log("[Client] User joined", data);
    // });

    socket.on("get-users", (data) => {
      console.log("[Client] Get users", data);
    });
  };

  return (
    <button
      onClick={joinRoom}
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl text-white hover:bg-rose-600"
    >
      Start new meeting
    </button>
  );
};

export default Join;
