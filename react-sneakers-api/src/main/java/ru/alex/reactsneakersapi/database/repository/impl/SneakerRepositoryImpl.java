package ru.alex.reactsneakersapi.database.repository.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.QSneaker;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.database.repository.SneakerRepositoryCustom;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;

import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class SneakerRepositoryImpl implements SneakerRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Sneaker> findAllListItems(SneakerFilter filter, Pageable pageable) {
        QSneaker sneaker = QSneaker.sneaker;

        List<Sneaker> sneakers = queryFactory
                .selectFrom(sneaker)
                .orderBy(sneaker.id.asc())
                .fetch();

        Long total = queryFactory
                .select(sneaker.count())
                .from(sneaker)
                .fetchOne();
        return new PageImpl<>(sneakers, pageable, Objects.requireNonNull(total));
    }
}
