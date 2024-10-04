import { Client } from "@stomp/stompjs";

let client;

export const connectWebSocket = (onMessageReceived)=>{
    client = new Client({
        brokerURL : "ws://localhost:8080/ws",
        onConnect : ()=>{
            console.log("Connected to web socket");
        },
        onStompError : (error)=>{
            console.log("Error Occurred while connecting : ", error.headers['message']);
            client.subscribe('/topic/messages/1' , (message)=>{
                if(message.body){
                    onMessageReceived(JSON.parse(message.body));
                }
            })
        }
    })
    client.activate();
}

export const sendMessage = (roomId , message)=>{
    if(client){
        client.publish({
            destination:`/app/chat/${roomId}`,
            body : JSON.stringify(message)
        })
    }
}