package com.mainServer.main_server.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "url.upload")
@Getter
@Setter
public class UrlConfig {
    private String utilServerUrl;
    private String ragServerUrl;
    private String clientUrl;
}
