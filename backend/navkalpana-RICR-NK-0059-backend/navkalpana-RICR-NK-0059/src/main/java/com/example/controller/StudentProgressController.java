
package com.example.controller;

import com.example.dto.ProgressDTO;
import com.example.service.StudentProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class StudentProgressController {

    private final StudentProgressService studentProgressService;

    // GET progress by batch ID
    @GetMapping("/{batchId}")
    public ResponseEntity<List<ProgressDTO>> getProgressByBatch(@PathVariable Long batchId) {
        List<ProgressDTO> progressList = studentProgressService.getProgressByBatch(batchId);
        return ResponseEntity.ok(progressList);
    }
}