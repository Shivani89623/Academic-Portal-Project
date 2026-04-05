package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.dto.QuizDTO;
import com.example.dto.QuizRequest;
import com.example.model.Batch;
import com.example.model.Quiz;
import com.example.repository.BatchRepository;
import com.example.repository.QuizRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final BatchRepository batchRepository;

    public QuizDTO createQuiz(QuizRequest request) {

        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        Quiz quiz = Quiz.builder()
                .title(request.getTitle())
                .duration(request.getDuration())
                .active(true)
                .batch(batch)
                .build();

        return mapToDTO(quizRepository.save(quiz));
    }

    public List<QuizDTO> getAllQuizzes() {
        return quizRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    private QuizDTO mapToDTO(Quiz q) {
        QuizDTO dto = new QuizDTO();
        dto.setId(q.getId());
        dto.setTitle(q.getTitle());
        dto.setDuration(q.getDuration());
        dto.setActive(q.getActive());
        dto.setBatchId(q.getBatch().getId());
        return dto;
    }
}