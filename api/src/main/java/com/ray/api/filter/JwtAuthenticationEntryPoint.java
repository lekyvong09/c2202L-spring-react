package com.ray.api.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ray.api.dto.HttpResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class JwtAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2) throws IOException {
        HttpResponse httpResponse = new HttpResponse((HttpStatus.FORBIDDEN.value()),
                                                    HttpStatus.FORBIDDEN,
                                                    HttpStatus.FORBIDDEN.getReasonPhrase(),
                                                    "You need to login to access this page");
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus((HttpStatus.FORBIDDEN.value()));

        OutputStream outputStream = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(outputStream, httpResponse);
        outputStream.flush();
    }
}
