package com.example.dto;

import lombok.Data;

@Data
public class QuizDTO {
    private Long id;
    private String title;
    private Integer duration;
    private Boolean active;
    private Long batchId;
}