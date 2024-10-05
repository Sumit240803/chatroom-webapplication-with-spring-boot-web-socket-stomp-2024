'use client'
import Chat from "./components/Chat";
import Header from "./components/Header";
import { useState } from 'react'
export default function Home() {
  const[chatrooms , setChatrooms] = useState([]);
  const handleShowChatRooms =async ()=>{
    try {
      const response =await fetch("http://localhost:8080/chatrooms",{
        method : "GET",
      })
      if(response.ok){
        const data = await response.json();
        setChatrooms(data);
        console.log("Got the response");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header/>
      <div>
            <ul className="flex justify-center">
                <li className="mx-2 border-indigo-900 border-2 my-3 rounded-lg text-green-900 p-2 text-xl"><button onClick={handleShowChatRooms}>Show ChatRooms</button></li>
                <li className="mx-2  border-indigo-900 border-2 my-3 rounded-lg text-green-900 p-2 text-xl"><button>Create ChatRoom</button></li>
            </ul>
      </div>
      <Chat chatrooms = {chatrooms}/>

    </div>
  );
}
