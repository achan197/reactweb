import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import CardGrid from "./CardGrid";

export const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [activeResult, setActiveResult] = useState(0);
  const [searchResults, setSearchResults] = useState({});
  const teams = props.teams;

  const handleSearch = useCallback(
    (value) => {
      const input = value;
      setInput(value);

      //resets search results
      setActiveResult((prev) => 0);
      setSearchResults((prev) => teams);

      //filters result based on input
      var filteredResults = Object.fromEntries(
        Object.entries(teams).filter(([k, v]) =>
          k.toLowerCase().replace(/\s/g, "").includes(input.toLowerCase())
        )
      );

      //sorts the filtered results alphabetically
      filteredResults = Object.keys(filteredResults)
        .sort()
        .reduce((obj, key) => {
          obj[key] = filteredResults[key];
          return obj;
        }, {});

      setSearchResults((prev) => filteredResults);
      console.log("searchsearchseach");
    },
    [teams]
  );

  useEffect(() => {
    console.log("triiger onces");
    handleSearch("");
  }, [handleSearch]);

  const onKeyDown = (e) => {
    // up key
    if (e.keyCode === 38 || e.keyCode === 37) {
      e.preventDefault();
      if (activeResult <= 0) {
        return;
      } else {
        document
          .getElementById(activeResult.toString())
          ?.classList.remove("result_active");
        setActiveResult((prev) => Number(activeResult) - 1);
      }

      //down key
    } else if (e.keyCode === 40 || e.keyCode === 39) {
      e.preventDefault();
      if (Number(activeResult) === Object.keys(searchResults).length - 1) {
        return;
      } else {
        document
          .getElementById(activeResult.toString())
          ?.classList.remove("result_active");
        setActiveResult((prev) => Number(activeResult) + 1);
      }
    }
  };

  return (
    <div className="search_wrapper2">
      {Object.keys(teams).length > 0 ? (
        <div className="input_wrapper2">
          <FaSearch id="search-icon2" />
          <input
            className="input2"
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      ) : (
        <div />
      )}
      {Object.keys(searchResults).length > 0 ? (
        <CardGrid
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          activeResult={activeResult}
          setActiveResult={setActiveResult}
        ></CardGrid>
      ) : (
        <div />
      )}
    </div>
  );
};
