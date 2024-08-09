import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";

const Leave = ({ roomId }) => {
  const navigate = useNavigate();
  const { socket, me } = useContext(RoomContext);

  const leaveRoom = () => {
    socket.emit("leave-room", {
      roomId,
      peerId: me._id,
      email: "therapist@example.com",
    });

    // socket.on("user-left", (data) => {
    //   console.log("[Client] User left", data);
    // });

    socket.on("get-users", (data) => {
      console.log("[Client] Get users", data);
    });

    navigate("/");
  };

  return (
    <button
      onClick={leaveRoom}
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl text-white hover:bg-rose-600"
    >
      End meeting
    </button>
  );
};

export default Leave;
