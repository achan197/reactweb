import React, { useState } from "react";
import { SearchBarNameOnly } from "components/SearchBarNameOnly";
import "./SearchMatchup.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Matchup = (props) => {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [idOne, setIdOne] = useState("");
  const [idTwo, setIdTwo] = useState("");

  return (
    <div className="teams_page">
      <div>
        {props.teams ? (
          <div className="matchup-bar">
            <div className="team-one">
              <h2 className="team-one-header">Team 1</h2>
              <SearchBarNameOnly
                teams={props.teams}
                input={inputOne}
                setInput={setInputOne}
                setId={setIdOne}
              ></SearchBarNameOnly>
            </div>
            <div className="versus">
              <h1 className="versus-text">VS</h1>
            </div>
            <div className="team-two">
              <h2 className="team-two-header">Team 2</h2>
              <SearchBarNameOnly
                teams={props.teams}
                input={inputTwo}
                setInput={setInputTwo}
                setId={setIdTwo}
              ></SearchBarNameOnly>
            </div>

            <div className="search-icon-wrapper">
              <div className="search-icon-bg">
                {inputOne === inputTwo && inputOne !== "" ? (
                  <div>Team cannot verse themselves!</div>
                ) : (
                  <Link
                    to={`/matchup/${inputOne.replace(
                      /\s/g,
                      ""
                    )}-vs-${inputTwo.replace(/\s/g, "")}`}
                    state={{
                      inputOne: inputOne,
                      inputTwo: inputTwo,
                      idOne: idOne,
                      idTwo: idTwo,
                    }}
                    className="search-link"
                  >
                    <FaSearch id="search-icon" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Matchup;
