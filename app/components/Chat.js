'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { connectWebSocket , sendMessage } from '../utils/websocket'
const Chat = () => {
    const[messages , setMessages] = useState([]);
    const[messageContent , setMessageContent] = useState('');
    useEffect(()=>{
        connectWebSocket((newMessage)=>{
            setMessages((preMessage)=>{
                [...preMessage , newMessage]
            });
        })
    },[]);

    const handleSendMessage = ()=>{
        const message = {
            sender : "Test User",
            content : messageContent
        }
        sendMessage('1' , message);
        setMessageContent('');
    }
  return (
    <div>
        <div>
            <h1>Chat</h1>
        </div>
        <div>
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
        <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat