'use client'
import React from 'react'
import { useState } from 'react'
import { connectWebSocket , sendMessage } from '../utils/websocket'
const Chat = ({chatrooms}) => {
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
    <div>
        <div>
            <h1>Chat</h1>
        </div>
        <div>
            <input type="text" placeholder="Enter Your Name" value={currName} onChange = {(e)=>setName(e.target.value)}></input>
        </div>
        <div>
            {chatrooms.map(chatroom=>(
                 <li key={chatroom.id}>
                 {chatroom.name} - 
                 <button onClick={() => handleJoinChat(chatroom.id , chatroom.name)}>Join Chat</button> {/* Corrected onClick */}
                 {/* Corrected onClick */}
             </li>
            ))}

        </div>
        {joinChat && (
            <>
            <div>
            Current ChatRoom You're in {currChat.name}
            {messages.map((msg,index)=>(
                <div key={index}>
                    <strong>{msg.sender}</strong> : {msg.content}
                </div>
            ))}
        </div>
        <input
        type='text'
        value = {messageContent}
        onChange={(e)=>setMessageContent(e.target.value)
        }
        placeholder='Type Your Message'
        ></input>
        <button onClick={()=>handleSendMessage(currChat.id)}>Send</button>
            </>
        )}
    </div>
  );
}

export default Chat