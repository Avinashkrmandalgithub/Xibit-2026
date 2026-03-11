package com.mainServer.main_server.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
@Data
@Builder
public class Message {
    @Id
    private String id;

    private String userId;

    private String content;

    private String sender;
}
