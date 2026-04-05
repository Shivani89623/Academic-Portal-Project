
package com.example.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.dto.QuizDTO;
import com.example.dto.QuizRequest;
import com.example.service.QuizService;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService service;

    // ✅ Create Quiz
    @PostMapping
    public QuizDTO create(@RequestBody QuizRequest request) {
        return service.createQuiz(request);
    }

    // ✅ Get All Quizzes
    @GetMapping
    public List<QuizDTO> getAll() {
        return service.getAllQuizzes();
    }

    // ✅ Delete Quiz
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteQuiz(id);
    }
}
