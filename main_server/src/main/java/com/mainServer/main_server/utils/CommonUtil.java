package com.mainServer.main_server.utils;

import java.util.UUID;

public class CommonUtil {
    public static String generateUniqueId() {
        return UUID.randomUUID().toString();
    }
}
