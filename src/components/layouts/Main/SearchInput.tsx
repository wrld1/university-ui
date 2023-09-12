import styles from "./Main.module.scss";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { ReactComponent as SearchIcon } from "../../../assets/icons/SearchIcon.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import {
  selectSearchValue,
  setSearchValue,
} from "../../../redux/search/search.slice";

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);
  const [displayedSearchValue, setDisplayedSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(displayedSearchValue, 500);

  useEffect(() => {
    if (searchValue !== debouncedSearchValue) {
      dispatch(setSearchValue(debouncedSearchValue));
    }
  }, [debouncedSearchValue, dispatch, searchValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const typedValue = event.target.value;
    setDisplayedSearchValue(typedValue);
  };

  return (
    <div className={styles["search__input--wrapper"]}>
      <div className={styles.search__icon}>
        <SearchIcon />
      </div>
      <input
        className={styles.search__input}
        type="text"
        placeholder="Search"
        value={displayedSearchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
