package com.mainServer.main_server.service;

import com.mainServer.main_server.dto.request.MessageRequestDto;
import com.mainServer.main_server.dto.response.MessageResponseDto;

public interface MessageService {

    MessageResponseDto queryMessage(MessageRequestDto messageRequestDto);
}
