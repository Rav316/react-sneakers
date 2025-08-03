package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.reactsneakersapi.database.entity.OrderItem;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>, OrderItemRepositoryCustom {
    @Query("""
        SELECT oi
        FROM OrderItem oi
        LEFT JOIN FETCH oi.order o
        LEFT JOIN FETCH oi.sneakerItem si
        LEFT JOIN FETCH si.sneaker s
        WHERE o.id = :orderId AND o.user.id = :userId
        """)
    List<OrderItem> findAllByUserOrder(Integer orderId, Integer userId);
}
