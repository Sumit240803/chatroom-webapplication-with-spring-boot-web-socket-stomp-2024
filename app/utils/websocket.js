import { Client } from "@stomp/stompjs";

let client;
export const connectWebSocket = (onMessageReceived , id)=>{
    client = new Client({
        brokerURL: "ws://localhost:8080/ws",
       /* debug: (str) => {
            console.log(new Date(), str);  // Debugging logs for WebSocket connection
        },*/
        onConnect: () => {
            console.log("Connected to WebSocket");
            // Add a slight delay before subscribing
            setTimeout(() => {
                client.subscribe(`/topic/messages/${id}`, (message) => {
                    console.log('Message received:', message.body); // Ensure message is logged
                    if (message.body) {
                        onMessageReceived(JSON.parse(message.body));
                    }
                });
              //  console.log('Subscription made to /topic/messages/1');
            }, 500); // Adjust the delay if necessary (500 ms)
        },
        onStompError: (error) => {
            console.log("Error occurred while connecting: ", error.headers['message']);
        }
    });
    
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

export const unSubscribe = ()=>{
    if(client){
        client.unsubscribe();
        console.log("Unsubscribed");
    }else{
        console.log("No active subscription");
    }
}