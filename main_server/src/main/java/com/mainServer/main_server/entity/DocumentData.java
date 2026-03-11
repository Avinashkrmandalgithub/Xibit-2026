package com.mainServer.main_server.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "document_data")
@Data
@Builder
public class DocumentData {
    @Id
    private String id;

    private String userId;

    private String url;

    private String fileName;

    private String fileType;

    private String fileId;

    private String size;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
