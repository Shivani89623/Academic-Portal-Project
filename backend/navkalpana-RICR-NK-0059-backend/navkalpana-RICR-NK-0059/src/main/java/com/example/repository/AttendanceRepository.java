
package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.Attendance;
import com.example.model.AttendanceStatus;
import java.time.LocalDate;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    long countByStudentId(Long studentId);

    long countByStudentIdAndStatus(Long studentId, AttendanceStatus status);

    boolean existsByStudentIdAndDate(Long studentId, LocalDate date);
    boolean existsByStudentIdAndBatchIdAndDate(Long studentId, Long batchId, LocalDate date);
}