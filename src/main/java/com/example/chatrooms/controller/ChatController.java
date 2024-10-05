package com.example.chatrooms.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.chatrooms.models.Chatroom;
import com.example.chatrooms.models.Message;
import com.example.chatrooms.repositories.ChatRoomRepository;
import com.example.chatrooms.repositories.MessageRepository;

@Controller
public class ChatController {
	
	@Autowired
	private ChatRoomRepository chatRoomRepo;
	
	@Autowired
	private MessageRepository messageRepo;
	
	@MessageMapping("/chat/{roomId}")
	@SendTo("/topic/messages/{roomId}")
	public Message sendMessage(@DestinationVariable String roomId, @Payload Message payload) {
	    Chatroom chatRoom = chatRoomRepo.findById(Long.valueOf(roomId)).orElseThrow(() -> new RuntimeException("Chatroom Not Found"));
	    
	    // Create a new Message object
	    Message message = new Message();
	    
	    // Set the sender and content from the payload
	    message.setSender(payload.getSender());  // Make sure payload has sender info
	    message.setContent(payload.getContent());  // Directly use the content from the payload
	    message.setChatRoom(chatRoom);
	    message.setTimestamp(LocalDateTime.now());

	    // Save message to the database
	    messageRepo.save(message);
	    
	    return message;  // Return the message object
	}

	
	@GetMapping("/chatrooms")
	@ResponseBody
	public List<Chatroom> getChatroom(){
		return chatRoomRepo.findAll();
	}
	
	@PostMapping("/chatrooms")
	@ResponseBody
	public Chatroom createChatroom(@RequestBody Chatroom chatroom) {
		return chatRoomRepo.save(chatroom);
	}
}
