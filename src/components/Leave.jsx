import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const Leave = ({ roomId }) => {
  const { me, leaveRoom } = useContext(RoomContext);

  return (
    <button
      onClick={() => leaveRoom(roomId, me._id)}
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl text-white hover:bg-rose-600"
    >
      End meeting
    </button>
  );
};

export default Leave;
