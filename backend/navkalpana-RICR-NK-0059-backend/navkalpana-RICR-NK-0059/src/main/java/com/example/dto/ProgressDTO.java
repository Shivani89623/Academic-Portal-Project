
package com.example.dto;

import lombok.*;




@Data
@AllArgsConstructor
public class ProgressDTO {
    private Long studentId;
    private String studentName;
    private Double attendancePercentage;
    private Double assignmentAverage;
    private Double quizAverage;
    private Double overallGrowthIndex;
}