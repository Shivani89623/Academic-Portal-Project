
package com.example.service;


import com.example.dto.AttendanceRequest;
import com.example.model.*;
import com.example.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final BatchRepository batchRepository;

    // ✅ Mark Attendance
    public void mark(AttendanceRequest request) {

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        // ✅ Duplicate check (correct)
        if (attendanceRepository.existsByStudentIdAndBatchIdAndDate(
                student.getId(),
                batch.getId(),
                request.getDate()
        )) {
            throw new RuntimeException("Attendance already marked for this date");
        }

        // ✅ Direct ENUM usage
        Attendance attendance = Attendance.builder()
                .student(student)
                .batch(batch)
                .date(request.getDate())
                .status(AttendanceStatus.valueOf(request.getStatus().toUpperCase()))
                .remarks(request.getRemarks())
                .build();

        attendanceRepository.save(attendance);
    }

    // ✅ Get All (DTO based 🔥)
    public List<AttendanceRequest> getAllAttendance() {
        return attendanceRepository.findAll().stream().map(a -> {
            AttendanceRequest dto = new AttendanceRequest();
            dto.setId(a.getId());
            dto.setBatchId(a.getId());
            dto.setStudentId(a.getStudent().getId());
          dto.setStudentName( a.getStudent().getName());
            dto.setBatchId(a.getBatch().getId());
            dto.setDate(a.getDate());
            dto.setStatus(a.getStatus().name());
            dto.setRemarks(a.getRemarks());
            return dto;
        }).toList();
    }

    // ✅ Attendance Percentage
    public double calculateAttendancePercentage(Long studentId) {
        long total = attendanceRepository.countByStudentId(studentId);
        if (total == 0) return 0;

        long present = attendanceRepository.countByStudentIdAndStatus(
                studentId,
                AttendanceStatus.PRESENT
        );

        return (double) present / total * 100;
    }

    // ✅ Count by status
    public long getCountByStatus(Long studentId, AttendanceStatus status) {
        return attendanceRepository.countByStudentIdAndStatus(studentId, status);
    }
}