import styles from './home-page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useEffect, useState } from 'react';
import { fetchSneakers } from '../../redux/slice/sneaker-slice.ts';
import { useDebounce } from 'use-debounce';
import type { Order } from '../../constants/order.ts';
import { type SortOption, sortOptions } from '../../constants/sort.ts';
import {
  EmptyResult,
  ErrorResult,
  Pagination,
  Search,
  SneakerCard,
  SneakerCardSkeleton,
  SortBlock,
} from '../../components/shared';
import { FadeContent } from '../../hoc';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchValue = useSelector((state: RootState) => state.search.value);
  const [debouncedSearch] = useDebounce(searchValue, 300);
  const { sneakers, loading, error } = useSelector(
    (state: RootState) => state.sneaker,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<Order>('asc');
  const [sortOption, setSortOption] = useState<SortOption>(sortOptions[0]);
  useEffect(() => {
    dispatch(
      fetchSneakers({
        search: debouncedSearch,
        page: currentPage - 1,
        size: 12,
        order,
        sort: sortOption.value,
      }),
    );
  }, [dispatch, debouncedSearch, currentPage, order, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);
  const totalPages = Math.ceil(
    sneakers.metadata.totalElements / sneakers.metadata.size,
  );

  if (error) {
    return (
      <div className={styles.root}>
        <ErrorResult />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.titleWrapper}>
        <h1>Все кроссовки</h1>
        <div className={styles.searchWrapper}>
          <Search />
          <SortBlock
            order={order}
            setOrder={setOrder}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
      </div>
      {!loading && sneakers.content.length === 0 ? (
        <EmptyResult />
      ) : (
        <>
          <div className={styles.sneakerCardsWrapper}>
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <SneakerCardSkeleton key={index} />
                ))
              : sneakers.content.map((sneaker) => (
                  <FadeContent key={sneaker.id}>
                    <SneakerCard sneaker={sneaker} />
                  </FadeContent>
                ))}
          </div>
          {!loading && (
            <Pagination
              selectedPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
