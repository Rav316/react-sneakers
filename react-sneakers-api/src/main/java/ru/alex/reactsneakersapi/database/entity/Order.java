package ru.alex.reactsneakersapi.database.entity;

import jakarta.persistence.*;
import lombok.*;
import ru.alex.reactsneakersapi.database.converter.OrderStatusConverter;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "items")
@EqualsAndHashCode(exclude = "items")
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Convert(converter = OrderStatusConverter.class)
    private OrderStatus status;

    @Column(name = "created_at")
    private Instant createdAt;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> items;
}
