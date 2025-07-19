package ru.alex.reactsneakersapi.database.repository.impl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSourceUtils;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.QUser;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.database.repository.SneakerRepositoryCustom;
import ru.alex.reactsneakersapi.dto.favorites.FavoritesCreateDto;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.mapper.sneaker.SneakerListMapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import static ru.alex.reactsneakersapi.database.entity.QSneaker.sneaker;

@Component
@RequiredArgsConstructor
public class SneakerRepositoryImpl implements SneakerRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final SneakerListMapper sneakerListMapper;

    @Override
    public Page<SneakerListDto> findAllListItems(Integer userId, SneakerFilter filter, Pageable pageable) {

        BooleanExpression predicate = buildPredicate(filter);
        QUser userSub = new QUser("userSub");
        List<Tuple> result = queryFactory
                .select(
                        sneaker,
                        JPAExpressions.selectOne()
                                .from(userSub)
                                .where(
                                        userId != null
                                                ? userSub.id.eq(userId).and(userSub.favoriteSneakers.contains(sneaker))
                                                : Expressions.FALSE
                                )
                                .exists()
                )
                .from(sneaker)
                .leftJoin(sneaker.type).fetchJoin()
                .where(predicate)
                .orderBy(getSortOrder(filter))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<SneakerListDto> sneakers = result
                .stream()
                .map(tuple -> {
                    Sneaker s = tuple.get(sneaker);
                    return sneakerListMapper.toDto(Objects.requireNonNull(s), Objects.requireNonNull(tuple.get(1, Boolean.class)));
                }).toList();

        Long total = queryFactory
                .select(sneaker.count())
                .from(sneaker)
                .where(predicate)
                .fetchOne();
        return new PageImpl<>(sneakers, pageable, Objects.requireNonNull(total));
    }

    @Override
    public void addFavoritesBatch(List<Integer> sneakerIds, Integer userId) {
        List<FavoritesCreateDto> batch = sneakerIds
                .stream()
                .map(id -> new FavoritesCreateDto(id, userId))
                .toList();
        String sql = """
                INSERT INTO favorites (sneaker_id, user_id)
                VALUES (:sneakerId, :userId)
                ON CONFLICT DO NOTHING
                """;
        SqlParameterSource[] batchParams = SqlParameterSourceUtils.createBatch(batch.toArray());
        jdbcTemplate.batchUpdate(sql, batchParams);
    }

    @Override
    public void removeAllFavorites(Integer userId) {
        jdbcTemplate.update("DELETE FROM favorites WHERE user_id = :userId", Collections.singletonMap("userId", userId));
    }

    private BooleanExpression buildPredicate(SneakerFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();
        if(filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(sneaker.name.containsIgnoreCase(filter.search()));
        }
        return predicate;
    }

    private OrderSpecifier<?>[] getSortOrder(SneakerFilter filter) {
        boolean desc = filter.order() != null && filter.order().equalsIgnoreCase("desc");
        OrderSpecifier<?> primarySort;
        if (filter.sort() == null) {
            primarySort = null;
        } else {
            primarySort = switch (filter.sort()) {
                case "price" -> desc ? sneaker.price.desc() : sneaker.price.asc();
                case "alphabet" -> desc ? sneaker.name.desc() : sneaker.name.asc();
                default -> null;
            };
        }
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        if (primarySort != null) {
            orderSpecifiers.add(primarySort);
        }
        orderSpecifiers.add(desc ? sneaker.id.desc() : sneaker.id.asc());
        return orderSpecifiers.toArray(new OrderSpecifier[0]);
    }
}
