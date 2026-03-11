package com.mainServer.main_server.utils;

import com.mainServer.main_server.config.UrlConfig;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class QueryRAG {
    private final UrlConfig urlConfig;
    private final RestTemplate restTemplate = new RestTemplate();

    public QueryRAG(UrlConfig urlConfig) {
        this.urlConfig = urlConfig;
    }

    public Map<String, Object> queryRAG(String userId, String question) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("user_id", userId);
            body.put("query", question);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String urlWithParams = urlConfig.getRagServerUrl() + "/rag/query";
            System.out.println("Querying RAG server at: " + urlWithParams);
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    urlWithParams,
                    requestEntity,
                    Map.class
            );

            if (response.getBody() == null) {
                throw new RuntimeException("Failed to query RAG: Empty response from RAG server");
            }

            return response.getBody();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

