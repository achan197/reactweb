import React, { useState } from "react";
import "./SearchBarNameOnly.css";
import List from "./List";

export const SearchBarNameOnly = (props) => {
  const input = props.input;
  const setInput = props.setInput;
  const setId = props.setId;
  const [activeResult, setActiveResult] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(Boolean);

  const handleSearch = (value) => {
    const input = value;
    setInput(value);
    console.log(props.teams);
    setActiveResult((prev) => 0);
    setSearchResults((prev) => Object.keys(props.teams));
    const filteredResults = Object.keys(props.teams)
      .filter((team) =>
        team.toLowerCase().replace(/\s/g, "").includes(input.toLowerCase())
      )
      .sort();
    setSearchResults((prev) => filteredResults);
    setShowResults(true);
  };

  const onKeyDown = (e) => {
    //enter key
    if (e.keyCode === 13) {
      setInput(searchResults[activeResult]);
      setActiveResult(0);
      setSearchResults([]);
      setShowResults(false);
      setId(props.teams[e.currentTarget.innerText].url_id);

      // up key
    } else if (e.keyCode === 38) {
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
    } else if (e.keyCode === 40) {
      e.preventDefault();
      if (Number(activeResult) === searchResults.length - 1) {
        return;
      } else {
        document
          .getElementById(activeResult.toString())
          ?.classList.remove("result_active");
        setActiveResult((prev) => Number(activeResult) + 1);
      }
    }
  };

  const setChange = () => {
    const selected = document.getElementById(activeResult.toString());
    if (selected) {
      selected?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
      });
    }
  };

  return (
    <div className="search_wrapper">
      <div className="input_wrapper">
        {/* <FaSearch id="search-icon" /> */}
        <input
          className="input"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
      <List
        input={input}
        setInput={setInput}
        showResults={showResults}
        setShowResults={setShowResults}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        activeResult={activeResult}
        setActiveResult={setActiveResult}
        setChange={setChange}
        setId={setId}
        teams={props.teams}
      />
    </div>
  );
};
