package com.gizemulubayam.todo.dto;

import lombok.Data;

@Data
public class JsonWebTokenResponse {

    private final String tokenType = "Bearer";

    private String accessToken;

    public JsonWebTokenResponse(String accessToken) {
        this.accessToken = accessToken;
    }

}