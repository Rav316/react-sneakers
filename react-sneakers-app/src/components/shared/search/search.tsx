import styles from "./search.module.scss";
import closeIcon from "../../../assets/close.svg";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store.ts";
import { setSearchValue } from "../../../redux/slice/search-slice.ts";

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchValue = useSelector((state: RootState) => state.search.value);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  }

  return (
    <div className={styles.searchWrapper}>
      <input
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        value={searchValue}
        ref={inputRef}
        className={styles.searchInput}
        placeholder={"Поиск..."}
      />
      <img
        onClick={onClickClear}
        className={styles.clearButton}
        src={closeIcon}
        alt={"clear button"}
      />
    </div>
  );
};
