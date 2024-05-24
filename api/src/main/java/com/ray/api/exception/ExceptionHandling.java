package com.ray.api.exception;

import com.ray.api.dto.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class ExceptionHandling {

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<HttpResponse> noHandlerFoundException(NoHandlerFoundException e) {
        return createHttpResponse(HttpStatus.NOT_FOUND, "There is no mapping URL");
    }

    private ResponseEntity<HttpResponse> createHttpResponse(HttpStatus httpStatus, String message) {
        HttpResponse httpResponse = new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase(), message);
        return new ResponseEntity<>(httpResponse, httpStatus);
    }
}
