package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.reactsneakersapi.database.entity.CartItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer>, CartItemRepositoryCustom {

    @Query("""
        SELECT ci
        FROM CartItem ci
        LEFT JOIN FETCH ci.sneakerItem si
        LEFT JOIN FETCH si.sneaker s
        LEFT JOIN FETCH s.type t
        WHERE ci.user.id = :userId
        ORDER BY ci.id
        """)
    List<CartItem> findAllByUser(Integer userId);

    @Query("SELECT ci FROM CartItem ci WHERE ci.id = :id AND ci.user.id = :userId")
    Optional<CartItem> findByIdAndUser(Integer id, Integer userId);

    @Query("""
        SELECT ci
        FROM CartItem ci
        LEFT JOIN FETCH ci.sneakerItem si
        LEFT JOIN FETCH si.sneaker s
        LEFT JOIN FETCH s.type t
        WHERE ci.id = :id AND ci.user.id = :userId
        """)
    Optional<CartItem> findByIdAndUserWithLoadedEntities(Integer id, Integer userId);

    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.id = :id AND ci.user.id = :userId")
    void removeByIdAndUser(Integer id, Integer userId);

    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.user.id = :userId")
    void clearUserCart(Integer userId);
}
