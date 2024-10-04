import Chat from "./components/Chat";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header/>
      <div>
            <ul className="flex justify-center">
                <li className="mx-2 border-indigo-900 border-2 my-3 rounded-lg text-green-900 p-2 text-xl"><button>Show ChatRooms</button></li>
                <li className="mx-2  border-indigo-900 border-2 my-3 rounded-lg text-green-900 p-2 text-xl"><button>Create ChatRoom</button></li>
            </ul>
      </div>
      <Chat/>

    </div>
  );
}
