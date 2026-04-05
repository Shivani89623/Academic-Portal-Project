

package com.example.controller;


import com.example.dto.AttendanceRequest;
import com.example.model.AttendanceStatus;
import com.example.service.AttendanceService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService service;

    // ✅ Get all attendance
    @GetMapping
    public ResponseEntity<List<AttendanceRequest>> getAllAttendance() {
        return ResponseEntity.ok(service.getAllAttendance());
    }

    // ✅ Mark attendance
    @PostMapping
    public ResponseEntity<String> mark(@Valid @RequestBody AttendanceRequest request) {
        service.mark(request);
        return ResponseEntity.ok("Attendance marked successfully");
    }

    // ✅ Attendance percentage
    @GetMapping("/percentage/{studentId}")
    public ResponseEntity<Double> percentage(@PathVariable Long studentId) {
        return ResponseEntity.ok(service.calculateAttendancePercentage(studentId));
    }

    // ✅ Present count
    @GetMapping("/present/{studentId}")
    public ResponseEntity<Long> presentCount(@PathVariable Long studentId) {
        return ResponseEntity.ok(
                service.getCountByStatus(studentId, AttendanceStatus.PRESENT)
        );
    }

    // ✅ Absent count
    @GetMapping("/absent/{studentId}")
    public ResponseEntity<Long> absentCount(@PathVariable Long studentId) {
        return ResponseEntity.ok(
                service.getCountByStatus(studentId, AttendanceStatus.ABSENT)
        );
    }
}