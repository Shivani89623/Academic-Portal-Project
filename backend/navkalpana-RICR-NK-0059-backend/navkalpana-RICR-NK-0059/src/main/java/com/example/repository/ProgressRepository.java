


package com.example.repository;


import com.example.model.StudentProgress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<StudentProgress, Long> {
    // Fetch progress by batch ID (entity)
    List<StudentProgress> findByBatchId(Long batchId);
}