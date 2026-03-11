package com.mainServer.main_server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CurrentUserDto {
    private String userId;
    private String email;
    private String name;
    private String avatar;
}
