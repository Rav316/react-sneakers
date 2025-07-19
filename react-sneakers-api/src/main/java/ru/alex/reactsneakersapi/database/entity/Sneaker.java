package ru.alex.reactsneakersapi.database.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(of = {"id", "name", "imageUrl", "price", "description"})
@EqualsAndHashCode(of = {"id", "name", "imageUrl", "price", "description"})
public class Sneaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    private BigDecimal price;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "firm_id", referencedColumnName = "id")
    private Firm firm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sneaker_type_id", referencedColumnName = "id")
    private SneakerType type;

    @OneToMany(mappedBy = "sneaker")
    private List<SneakerItem> items;

    @ManyToMany(mappedBy = "favoriteSneakers")
    private Set<User> favoriteUsers;
}
