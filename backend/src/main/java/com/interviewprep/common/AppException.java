package com.interviewprep.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AppException extends RuntimeException {

    private final HttpStatus status;
    private final ErrorCode errorCode;

    public AppException(String message, HttpStatus status, ErrorCode errorCode) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
    }

    public AppException(String message, HttpStatus status) {
        this(message, status, ErrorCode.BAD_REQUEST);
    }

    public AppException(String message) {
        this(message, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
    }
}
