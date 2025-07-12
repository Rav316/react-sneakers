package ru.alex.reactsneakersapi.http.filter;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.filter.OncePerRequestFilter;

public abstract class FilterBase extends OncePerRequestFilter {
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if(request.getMethod().equals("GET") && request.getRequestURI().startsWith("/api/sneakers")) {
            return true;
        }
        return request.getRequestURI().startsWith("/api/auth") ||
                request.getRequestURI().startsWith("/swagger-ui") ||
                request.getRequestURI().startsWith("/v3/api-docs") ||
                request.getRequestURI().startsWith("/images");
    }
}
