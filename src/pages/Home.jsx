import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { RoomContext } from "../context/RoomContext";

const Home = () => {
  const { enterRoom } = useContext(RoomContext);
  const roomId = uuidv4(); // appointment id

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl font-bold">Welcome to Therapy Meet</h1>

      <button
        onClick={() => enterRoom({ roomId })}
        className="bg-rose-400 py-2 px-8 rounded-lg text-xl text-white hover:bg-rose-600"
      >
        Go to Room
      </button>
    </div>
  );
};

export default Home;
