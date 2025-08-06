package ru.alex.reactsneakersapi.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.experimental.UtilityClass;

@UtilityClass
public class EmailUtils {
    public static String getHostName(String hostAddress, HttpServletRequest request) {
        return String.format("%s://%s:%s", request.getScheme(), hostAddress, request.getServerPort());
    }
}
