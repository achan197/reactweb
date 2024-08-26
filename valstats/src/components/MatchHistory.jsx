import React, { useEffect, useState } from "react";
import "./MatchHistory.css";
import axios from "axios";

export const MatchHistory = (props) => {
  const teamOne = props.teamOne;
  const idOne = props.idOne;
  const teamTwo = props.teamTwo;
  const idTwo = props.idTwo;
  const teamOneLogo = props.teamOneLogo;
  const teamTwoLogo = props.teamTwoLogo;
  const [matches, setMatches] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/matchups/${idOne}/${teamOne.replace(
            /\s/g,
            ""
          )}/${idTwo}/${teamTwo.replace(/\s/g, "")}`
        );
        setMatches(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {Object.keys(matches).length === 0 ? (
        <div className="match-container">
          <div className="match-card" style={{ justifyContent: "center" }}>
            No Match History, Teams have not played each other before
          </div>
        </div>
      ) : (
        <div className="match-container">
          {/* {teamOne} vs {teamTwo} */}
          {Object.entries(matches).map(([k, v], i) => {
            const teamOne_WL = matches[k].score1 > matches[k].score2;
            const teamTwo_WL = !teamOne_WL;
            return (
              //temp div, TODO: replace with <a>
              <div key={i} className="match-card">
                <div className="display-linebreak">
                  {matches[k].event}
                  {"\n"}
                  {matches[k].match}
                </div>
                <div
                  className={`team-one-container ${
                    teamOne_WL ? "winner" : "loser"
                  }`}
                >
                  <img
                    className="team-logo"
                    src={teamOneLogo}
                    alt="team-logo"
                  ></img>
                </div>
                <div className="scoreboard">
                  <span>{matches[k].score1}</span>
                  <span>:</span>
                  <span> {matches[k].score2}</span>
                </div>
                <div
                  className={`team-two-container ${
                    teamTwo_WL ? "winner" : "loser"
                  }`}
                >
                  <img
                    className="team-logo"
                    src={teamTwoLogo}
                    alt="team-logo"
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MatchHistory;
