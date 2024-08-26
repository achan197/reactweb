import React from "react";
import Card from "./Card";
import "./CardGrid.css";

export const CardGrid = (props) => {
  const searchResults = props.searchResults;
  const activeResult = props.activeResult;

  const onMouseOver = (e) => {
    console.log("WEEEEEEEEEEEEEEEEE");
    console.log(e.target);
    console.log(activeResult);
    e.target?.classList.add("card_active");
    props.setActiveResult((prev) => Number(e.target.id));
    console.log(activeResult);
  };
  const onMouseLeave = (e) => {
    e.target.classList.remove("card_active");
    props.setActiveResult((prev) => e.target.id);
    console.log(activeResult);
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
    <div>
      {Object.keys(searchResults).length > 0 ? (
        <div className="grid-container">
          {Object.entries(searchResults).map(([k, v], i) => {
            var classname;
            if (i === activeResult) {
              classname = "card_active";
            }
            setTimeout(() => {
              setChange();
            });
            return (
              <Card
                id={i.toString()}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                className={`${classname}`}
                key={v.name}
                name={v.name}
                logo={v.logo}
                country={v.country}
                region={v.region}
                url_id={v.url_id}
              ></Card>
            );
          })}
        </div>
      ) : (
        <ul className="search_list">
          <li className="no-options"></li>
        </ul>
      )}
    </div>
  );
};

export default CardGrid;
