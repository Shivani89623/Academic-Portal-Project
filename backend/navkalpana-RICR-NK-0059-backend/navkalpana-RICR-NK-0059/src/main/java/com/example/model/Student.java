
package com.example.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String enrollmentId;
    private String email;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;
}