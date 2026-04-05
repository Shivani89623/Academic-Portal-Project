
package com.example.service;

import com.example.dto.DashboardResponse;
import com.example.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final StudentRepository studentRepository;
    private final BatchRepository batchRepository;
    private final CourseRepository courseRepository;
    private final QuizRepository quizRepository;
    private final AssignmentRepository assignmentRepository;

    public DashboardResponse summary() {

        long totalStudents = studentRepository.count();
        long totalBatches = batchRepository.count();
        long totalCourses = courseRepository.count();
        long totalQuizzes = quizRepository.count();
        long totalAssignments = assignmentRepository.count();

        return DashboardResponse.builder()
                .totalStudents(totalStudents)
                .totalBatches(totalBatches)
                .totalCourses(totalCourses)
                .totalQuizzes(totalQuizzes)
                .totalAssignments(totalAssignments)
                .build();
    }
}