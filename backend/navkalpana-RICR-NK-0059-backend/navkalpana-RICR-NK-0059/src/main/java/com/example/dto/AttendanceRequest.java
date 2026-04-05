
package com.example.dto;

import lombok.Data;

import java.time.LocalDate;

import com.example.model.AttendanceStatus;

@Data
public class AttendanceRequest {
	 private Long id;
    private Long studentId;
    private String studentName; 
    private Long batchId;
    private String status;
    private String remarks;
    private LocalDate date;
}