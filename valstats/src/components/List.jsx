import React from "react";
import "./List.css";

export const List = (props) => {
  const input = props.input;
  const showResults = props.showResults;
  const searchResults = props.searchResults;
  const activeResult = props.activeResult;
  const setChange = props.setChange;
  const teams = props.teams;

  const onClick = (e) => {
    props.setActiveResult(0);
    props.setSearchResults([]);
    props.setShowResults(false);
    props.setInput(e.currentTarget.innerText);
    // console.log(e.currentTarget.innerText);
    // console.log(teams);
    // console.log(teams[e.currentTarget.innerText]);
    // console.log(teams[e.currentTarget.innerText].url_id);
    props.setId(teams[e.currentTarget.innerText].url_id);
  };

  const onMouseOver = (e) => {
    e.target.classList.add("result_active");
    props.setActiveResult((prev) => e.target.id);
  };
  const onMouseLeave = (e) => {
    e.target.classList.remove("result_active");
    props.setActiveResult((prev) => e.target.id);
  };

  return (
    <div className="list-wrapper">
      {input && showResults && searchResults.length > 0 ? (
        <ul className="search_list">
          {searchResults.map((result, id) => {
            var classname;
            if (id === activeResult) {
              classname = "result_active";
            }
            setTimeout(() => {
              setChange();
            });
            return (
              <li
                id={id}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                className={classname}
                key={result}
                data-sort-value={result}
                onClick={onClick}
              >
                {result}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="search_list">
          <li className="no-options"></li>
        </ul>
      )}
    </div>
  );
};

export default List;
