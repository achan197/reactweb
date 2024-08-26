import React from "react";
import { SearchBar } from "components/SearchBar";

export const Teams = (props) => {
  return (
    <div className="teams_page">
      {props.teams ? <SearchBar teams={props.teams}></SearchBar> : <div></div>}
    </div>
  );
};

export default Teams;
