'use client'
import React from 'react'
import { useState } from 'react'
import { connectWebSocket , sendMessage } from '../utils/websocket'
const Chat = ({chatrooms,showChat}) => {
    const[messages , setMessages] = useState([]);
    const[messageContent , setMessageContent] = useState('');
    const[joinChat , setJoinChat] = useState(false);
    const[currChat , setCurrChat] = useState({
        name : '',
        id : ''
    });
    const[currName , setName] = useState('');
    
    
  /*  useEffect(() => {
        let isSubscribed = true;
    
        connectWebSocket((newMessage) => {
            console.log("Raw message received from WebSocket:", newMessage); // Debugging the raw message
    
            if (isSubscribed) {
                // Try parsing the message
                 // See what the parsed message looks like
    
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });
    
        return () => {
            isSubscribed = false;
        };
    }, []);*/
      // Empty array to ensure it runs only once
      
    const handleSendMessage = (id)=>{
        const message = {
            sender : currName,
            content : messageContent
        }
        sendMessage(`${id}` ,message);
       // console.log(messages);
       // console.log(messageContent);
        setMessageContent('');
    }
    const handleJoinChat = (id , name)=>{
        setJoinChat(prevState => !prevState);
        setCurrChat({
            name : name,
            id : id
        });
        let isSubscribed = true;
    
        connectWebSocket((newMessage ) => {
            console.log("Raw message received from WebSocket:", newMessage); // Debugging the raw message
    
            if (isSubscribed) {
                // Try parsing the message
                 // See what the parsed message looks like
    
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        },id);
    
        return () => {
            isSubscribed = false;
        };
    }
  return (
    <div className="flex h-full justify-between">
  <div className="w-full">
    
    {joinChat && (
      <>
        <div className="border-2 border-red-400 h-full flex flex-col justify-between">
            <h1 className="text-center font-bold text-xl my-2  ">
             You're in {currChat.name}
            </h1>
          <div className="overflow-y-auto py-3  ">
            {messages.map((msg, index) => (
              <div key={index} className="flex justify-between items-center my-2 border-2 border-neutral-600 bg-opacity-50 bg-rose-600 rounded-lg p-2   w-2/5 m-auto">
                <strong className=''>{msg.sender}</strong> <p className='text-right'> {msg.content} </p>
              </div>
            ))}
          </div>
          {/* Input box and Send button at the bottom */}
          <div className="w-full p-2 bg-gray-600">
            <div className="flex justify-center">
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type Your Message"
                className="w-full p-1 max-w-xl  rounded-l-md focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage(currChat.id)}
                className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
  <div className="border-l-2 border-black px-16">
    <div>
      <input
        className="m-2 bg-purple-700 text-black font-semibold focus:outline-none p-2 rounded-xl text-lg"
        type="text"
        placeholder="Enter Your Name"
        value={currName}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div >
    {showChat &&
      chatrooms.map((chatroom) => (
        <div className='border-2 border-black my-2 border-opacity-10 rounded-lg'>
        <li key={chatroom.id} className="list-none text-xl p-2">
          {chatroom.name} -{' '}
          <button onClick={() => handleJoinChat(chatroom.id, chatroom.name)}>
            Join Chat
          </button>
        </li>
        </div>
      ))}
      </div>
  </div>
  
</div>

  );
}

export default Chat