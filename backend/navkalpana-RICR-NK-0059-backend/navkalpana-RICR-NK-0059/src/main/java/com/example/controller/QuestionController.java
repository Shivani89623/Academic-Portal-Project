
package com.example.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.dto.QuestionDTO;
import com.example.dto.QuestionRequest;
import com.example.service.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService service;

    // ✅ Add Question to Quiz
    @PostMapping("/{quizId}")
    public QuestionDTO add(@PathVariable Long quizId,
                           @RequestBody QuestionRequest request) {
        return service.addQuestion(quizId, request);
    }

    // ✅ Get Questions by Quiz
    @GetMapping("/quiz/{quizId}")
    public List<QuestionDTO> getByQuiz(@PathVariable Long quizId) {
        return service.getQuestionsByQuiz(quizId);
    }

    // ✅ Delete Question
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteQuestion(id);
    }
}