package com.example.dto;

import lombok.Data;

@Data
public class QuizRequest {
    private String title;
    private Integer duration;
    private Long batchId;
}