package com.example.cycling_knowledge.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartException;

@ControllerAdvice
public class GlobalExceptionHandler {

    //https://jira.spring.io/browse/SPR-14651
    @ExceptionHandler(MultipartException.class)
    public String handleError1(MultipartException e) {

        return e.getCause().getMessage();

    }
}