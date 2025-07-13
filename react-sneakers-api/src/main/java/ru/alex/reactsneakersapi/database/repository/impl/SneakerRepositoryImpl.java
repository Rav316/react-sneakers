package ru.alex.reactsneakersapi.database.repository.impl;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.database.repository.SneakerRepositoryCustom;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;

import java.util.List;
import java.util.Objects;

import static ru.alex.reactsneakersapi.database.entity.QSneaker.sneaker;

@Component
@RequiredArgsConstructor
public class SneakerRepositoryImpl implements SneakerRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Sneaker> findAllListItems(SneakerFilter filter, Pageable pageable) {

        BooleanExpression predicate = buildPredicate(filter);
        List<Sneaker> sneakers = queryFactory
                .selectFrom(sneaker)
                .where(predicate)
                .orderBy(sneaker.id.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(sneaker.count())
                .from(sneaker)
                .where(predicate)
                .fetchOne();
        return new PageImpl<>(sneakers, pageable, Objects.requireNonNull(total));
    }

    private BooleanExpression buildPredicate(SneakerFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();
        if(filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(sneaker.name.containsIgnoreCase(filter.search()));
        }
        return predicate;
    }
}
