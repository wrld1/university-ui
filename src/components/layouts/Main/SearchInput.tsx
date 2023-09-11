import styles from "./Main.module.scss";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { ReactComponent as SearchIcon } from "../../../assets/icons/SearchIcon.svg";
import { ChangeEvent, useEffect, useState } from "react";

const SearchInput: React.FC = () => {
  const [searchvalue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchvalue, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleSearch(searchvalue);
  };

  useEffect(() => {}, [debouncedValue]);

  const handleSearch = (searchvalue: string) => {
    //there will be a function that retrieves data based on searchValue
    console.log("its called");
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
        value={searchvalue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
