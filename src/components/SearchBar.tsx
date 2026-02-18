import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

type Props = {
  placeholder?: string;
  delay?: number;
  onDebounceChange: (value: string) => void;
  defaultValue?: string;
};

const SearchBar = ({
  placeholder = "Search...",
  delay = 300,
  onDebounceChange,
  defaultValue = "",
}: Props) => {
  const [text, setText] = useState(defaultValue);
  const debounced = useDebounce(text, delay);

  useEffect(() => {
    onDebounceChange(debounced.trim());
  }, [debounced, onDebounceChange]);

  return (
    <div className="mb-4">
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        placeholder={placeholder}
        className="w-96 p-2 rounded border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
      ></input>
    </div>
  );
};

export default SearchBar;
