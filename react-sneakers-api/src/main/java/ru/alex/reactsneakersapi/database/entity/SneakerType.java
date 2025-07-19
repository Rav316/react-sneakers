package ru.alex.reactsneakersapi.database.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "sneaker_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "sneakers")
@EqualsAndHashCode(exclude = "sneakers")
public class SneakerType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @OneToMany(mappedBy = "type")
    private List<Sneaker> sneakers;
}
