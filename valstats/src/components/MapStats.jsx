import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MapStats.css";

export const MapStats = (props) => {
  const teamOne = props.teamOne;
  const teamTwo = props.teamTwo;
  const idOne = props.idOne;
  const idTwo = props.idTwo;
  // const teamOne = "100Thieves";
  // const teamTwo = "Sentinels";
  // const idOne = 120;
  // const idTwo = 2;
  const [teamOneStats, setTeamOneStats] = useState([]);
  const [teamTwoStats, setTeamTwoStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/teams/stats/${idOne}/${teamOne.replace(
            " ",
            ""
          )}/${idTwo}/${teamTwo.replace(" ", "")}`
        );
        console.log(res.data);
        setTeamOneStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // console.log(teamOneStats);

  return (
    <div className="mapstats-container">
      <div className="table-background">
        <table className="mapstats-table">
          <thead>
            <tr className="main-headers">
              <th colSpan={4}>{teamOne} Overall Stats</th>
              <th colSpan={7}>
                {teamOne} vs {teamTwo} Stats
              </th>
              <th colSpan={4}>{teamTwo} Overall Stats</th>
            </tr>
            <tr>
              {teamOneStats.length !== 0 &&
                teamOneStats[0].map((item, index) => {
                  return <th key={index}>{item}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {teamOneStats &&
              teamOneStats.slice(1, teamOneStats.length).map((item, index) => {
                return (
                  <tr className="roww" key={index}>
                    {item.map((cell, j) => {
                      if (Array.isArray(cell)) {
                        if (cell.length === 0) {
                          return (
                            <td className="cell agent-cell" key={j}>
                              -
                            </td>
                          );
                        } else {
                          return (
                            <td className="cell agent-cell" key={j}>
                              {cell.map((agent, k) => {
                                return (
                                  <img
                                    className="agent-img"
                                    src={"//vlr.gg" + agent}
                                    alt={agent}
                                    key={k}
                                  ></img>
                                );
                              })}
                            </td>
                          );
                        }
                      } else if (cell.includes("owcdn")) {
                        return (
                          <td className="cell map-cell " key={j}>
                            <img
                              className="map-img"
                              src={cell}
                              alt={cell}
                            ></img>
                          </td>
                        );
                      } else if (cell.includes("%")) {
                        return (
                          <td className="cell percent-cell" key={j}>
                            {cell}
                          </td>
                        );
                      } else {
                        return (
                          <td className="cell wl-cell" key={j}>
                            {cell}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapStats;
