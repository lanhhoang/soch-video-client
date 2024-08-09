import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const Join = ({ roomId }) => {
  const { me, joinRoom } = useContext(RoomContext);

  return (
    <button
      onClick={() => joinRoom(roomId, me._id)}
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl text-white hover:bg-rose-600"
    >
      Join meeting
    </button>
  );
};

export default Join;
