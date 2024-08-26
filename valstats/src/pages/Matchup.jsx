import React, { useEffect, useState } from "react";
import { MatchHistory } from "components/MatchHistory";
import { MapStats } from "components/MapStats";
import { Roster } from "components/Roster";
import { Link, useLocation } from "react-router-dom";
import "./Matchup.css";

import axios from "axios";

export const Matchup = (props) => {
  const location = useLocation();
  const teamOne = location.state.inputOne;
  const teamTwo = location.state.inputTwo;
  const idOne = location.state.idOne;
  const idTwo = location.state.idTwo;
  // const teamOne = "100 Thieves";
  // const teamTwo = "Sentinels";
  // const idOne = 120;
  // const idTwo = 2;
  const [teamOneData, setTeamOneData] = useState({
    name: "",
    shortName: "",
    country: "",
    logo: "",
    roster: [],
  });
  const [teamTwoData, setTeamTwoData] = useState({
    name: "",
    shortName: "",
    country: "",
    logo: "",
    roster: [],
  });

  useEffect(() => {
    const fetchData = async (id, teamName, setData) => {
      try {
        const res = await axios.get(`/teams/${id}/${teamName}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(idOne, teamOne, setTeamOneData);
    fetchData(idTwo, teamTwo, setTeamTwoData);
  }, []);

  return (
    <div className="match-page">
      <h1 className="header">
        <div className="team-header">
          <img
            className="header-img"
            src={teamOneData.logo}
            alt="team-logo"
          ></img>
          <div className="team-name">{teamOne}</div>
        </div>
        <div>vs</div>
        <div className="team-header">
          <img
            className="header-img"
            src={teamTwoData.logo}
            alt="team-logo"
          ></img>
          <div className="team-name">{teamTwo}</div>
        </div>
      </h1>
      <div className="matchup-container">
        <div>
          <Roster
            teamOne={teamOne}
            teamTwo={teamTwo}
            teamOneRoster={teamOneData.roster}
            teamTwoRoster={teamTwoData.roster}
          ></Roster>
          <MapStats
            teamOne={teamOne}
            teamTwo={teamTwo}
            idOne={idOne}
            idTwo={idTwo}
          ></MapStats>
        </div>
        <MatchHistory
          teamOne={teamOne}
          teamTwo={teamTwo}
          idOne={idOne}
          idTwo={idTwo}
          teamOneLogo={teamOneData.logo}
          teamTwoLogo={teamTwoData.logo}
        ></MatchHistory>
      </div>
    </div>
  );
};

export default Matchup;
