package ru.alex.reactsneakersapi.http.filter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.http.handler.ErrorResponseHandler;
import ru.alex.reactsneakersapi.service.JwtService;
import ru.alex.reactsneakersapi.service.UserService;

import java.io.IOException;

import static org.springframework.http.HttpStatus.GONE;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static ru.alex.reactsneakersapi.util.AuthUtils.getJwtFromAuthHeader;

@Component
@RequiredArgsConstructor
public class JwtFilter extends FilterBase {
    private final JwtService jwtService;
    private final UserService userService;
    private final ErrorResponseHandler errorResponseHandler;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        try {
            String jwt = getJwtFromAuthHeader(authHeader);

            String username = jwtService.validateTokenAndRetrieveClaim(jwt);

            UserDetails userDetails = userService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    userDetails.getPassword(),
                    userDetails.getAuthorities()
            );

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            filterChain.doFilter(request, response);
        } catch (TokenExpiredException ex) {
            errorResponseHandler.writeErrorResponse(response, GONE, ex.getMessage());
        } catch (JWTVerificationException | UsernameNotFoundException ex) {
            errorResponseHandler.writeErrorResponse(response, UNAUTHORIZED, ex.getMessage());
        }
    }

}
