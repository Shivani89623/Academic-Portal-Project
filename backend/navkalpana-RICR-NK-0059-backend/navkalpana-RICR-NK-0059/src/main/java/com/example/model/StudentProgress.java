


package com.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "progress")
@Data // @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor sab include ho jaega
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;

    private Double attendancePercentage;
    private Double assignmentAverage;
    private Double quizAverage;
    private Double overallGrowthIndex;
}