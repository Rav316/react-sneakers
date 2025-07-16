package ru.alex.reactsneakersapi.database.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "favoriteSneakers")
@EqualsAndHashCode(exclude = "favoriteSneakers")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;

    @Column(name = "is_activated")
    private Boolean isActivated;

    private String uuid;

    @ManyToMany
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "sneaker_id")
    )
    @Builder.Default
    private Set<Sneaker> favoriteSneakers = new HashSet<>();
}
