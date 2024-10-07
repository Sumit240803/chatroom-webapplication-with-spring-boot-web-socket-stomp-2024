'use client'
import Chat from "./components/Chat";
import Header from "./components/Header";
import { useState } from 'react'
export default function Home() {
  const[chatrooms , setChatrooms] = useState([]);
  const[showChat , setShowChat] = useState(false);
  const[name , setMyName] = useState('');
  const [isOpen, setIsOpen] = useState(false); 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async(e) => {

    e.preventDefault();
    const formData = {name};
    const response =await fetch("http://localhost:8080/chatrooms",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formData)
    })
    if(response.ok){
      alert("Submitted");
    }
    setMyName(""); // Reset the input after submission
    togglePopup(); // Close the popup after submission
  };

  const handleShowChatRooms =async ()=>{
    try {
      const response =await fetch("http://localhost:8080/chatrooms",{
        method : "GET",
      })
      if(response.ok){
        const data = await response.json();
        setChatrooms(data);
        setShowChat(preState=>!preState);
        
       // console.log("Got the response");
       // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-screen bg-black">
      <Header/>
      <div className="bg-black ">
            <ul className="flex justify-center">
                <li className="mx-2 border-indigo-900 border-4 my-3 rounded-lg text-white p-2 text-xl"><button onClick={handleShowChatRooms}>All Chatrooms</button></li>
                <li className="mx-2  border-indigo-900 border-4 my-3 rounded-lg text-white p-2 text-xl"><button onClick={togglePopup}>Create ChatRoom</button></li>
            </ul>
      </div>
      <div className="bg-slate-400 h-96 my-1">
      <Chat chatrooms = {chatrooms} showChat={showChat}/>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Enter Name</h2>
            <button onClick={()=>setIsOpen(false)}>Close</button>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setMyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={togglePopup}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
