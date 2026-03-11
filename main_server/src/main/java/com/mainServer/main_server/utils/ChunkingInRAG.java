package com.mainServer.main_server.utils;

import com.mainServer.main_server.config.UrlConfig;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ChunkingInRAG {
    private final UrlConfig urlConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    public ChunkingInRAG(UrlConfig urlConfig) {
        this.urlConfig = urlConfig;
    }

    public Map<String, Object> startChunking(String userId) {
        try{
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

            String urlWithParams = urlConfig.getRagServerUrl() + "/rag/ingest" + "?user_id=" + userId;
            System.out.println("Chunking URL: " + urlWithParams);
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    urlWithParams,
                    requestEntity,
                    Map.class
            );

            if(response.getBody() == null) {
                throw new RuntimeException("Response body is null");
            }

            System.out.println("Chunking response: " + response.getBody());

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}