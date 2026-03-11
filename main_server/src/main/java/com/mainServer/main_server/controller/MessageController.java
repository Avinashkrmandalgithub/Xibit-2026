package com.mainServer.main_server.controller;

import com.mainServer.main_server.dto.request.MessageRequestDto;
import com.mainServer.main_server.dto.response.MessageResponseDto;
import com.mainServer.main_server.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
@AllArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/query")
    ResponseEntity<MessageResponseDto> queryMessage(@RequestBody MessageRequestDto messageRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(messageService.queryMessage(messageRequestDto));
    }
}
