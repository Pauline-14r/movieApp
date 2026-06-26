import {useState} from "react";
import type {IInput} from "./types.ts";
import styles from "./searchInput.module.css";
import { useDebouncedCallback } from 'use-debounce';

function SearchInput({handleInput}: IInput) {
    const [localState, setLocalState] = useState<string>("");
    const debounced = useDebouncedCallback((value: string) => {
        handleInput(value);
    }, 500);
    return (
        <div className={styles.search}>
            <input
                className={styles.search_input}
                type={"text"}
                placeholder={"Type to search..."}
                value={localState}
                onChange={(e) => {
                    setLocalState(e.target.value)
                    debounced(e.target.value)}
                }>
            </input>
        </div>
    )
}

export default SearchInput;

