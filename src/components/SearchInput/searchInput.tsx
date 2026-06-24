import type {IInput} from "./types.ts";
import styles from "./searchInput.module.css";

function SearchInput({handleInput, query}: IInput) {
    return (
        <div className={styles.search}>
            <input
                className={styles.search_input}
                type={"text"}
                placeholder={"Type to search..."}
                value={query}
                onChange={(e) => handleInput(e.target.value)}>
            </input>
        </div>
    )
}

export default SearchInput;

