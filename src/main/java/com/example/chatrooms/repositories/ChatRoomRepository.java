package com.example.chatrooms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chatrooms.models.Chatroom;

@Repository
public interface ChatRoomRepository extends JpaRepository<Chatroom, Long> {

}

