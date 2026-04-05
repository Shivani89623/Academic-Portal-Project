
package com.example.service;

import com.example.dto.ProgressDTO;

import com.example.model.StudentProgress;
import com.example.repository.ProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentProgressService {
	private final ProgressRepository progressRepository;

    public List<ProgressDTO> getProgressByBatch(Long batchId) {
        List<StudentProgress> progressList = progressRepository.findByBatchId(batchId);

        return progressList.stream().map(p -> new ProgressDTO(
                p.getStudent().getId(),
                p.getStudent().getName(),
                p.getAttendancePercentage(),
                p.getAssignmentAverage(),
                p.getQuizAverage(),
                p.getOverallGrowthIndex()
        )).collect(Collectors.toList());

    }
}