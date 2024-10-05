package com.example.chatrooms.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatrooms.models.Chatroom;
import com.example.chatrooms.models.Message;

public interface MessageRepository extends JpaRepository<Message , Long>{
	List<Message> findByChatroom(Chatroom chatroom);
}