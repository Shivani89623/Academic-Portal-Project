
package com.example.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.repository.*;
import com.example.dto.QuestionDTO;
import com.example.dto.QuestionRequest;
import com.example.model.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    public QuestionDTO addQuestion(Long quizId, QuestionRequest request) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (!List.of("A","B","C","D").contains(request.getCorrectAnswer())) {
            throw new RuntimeException("Correct answer must be A/B/C/D");
        }

        Question question = Question.builder()
                .questionText(request.getQuestionText())
                .optionA(request.getOptionA())
                .optionB(request.getOptionB())
                .optionC(request.getOptionC())
                .optionD(request.getOptionD())
                .correctAnswer(request.getCorrectAnswer())
                .quiz(quiz)
                .build();

        return mapToDTO(questionRepository.save(question));
    }

    public List<QuestionDTO> getQuestionsByQuiz(Long quizId) {
        return questionRepository.findByQuizId(quizId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    private QuestionDTO mapToDTO(Question q) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(q.getId());
        dto.setQuestionText(q.getQuestionText());
        dto.setOptionA(q.getOptionA());
        dto.setOptionB(q.getOptionB());
        dto.setOptionC(q.getOptionC());
        dto.setOptionD(q.getOptionD());
        dto.setCorrectAnswer(q.getCorrectAnswer());
        return dto;
    }
}