import React, { useEffect, useState } from "react";
import "./Roster.css";

export const Roster = (props) => {
  const teamOne = props.teamOne;
  const teamTwo = props.teamTwo;
  const teamOneRoster = props.teamOneRoster;
  const teamTwoRoster = props.teamTwoRoster;
  const players = ["player", "Inactive", "Sub"];

  const teamOnePlayers = teamOneRoster.filter((person) => {
    return players.includes(person.role);
  });
  const teamOneStaff = teamOneRoster.filter((person) => {
    return !players.includes(person.role);
  });

  const teamTwoPlayers = teamTwoRoster.filter((person) => {
    return players.includes(person.role);
  });
  const teamTwoStaff = teamTwoRoster.filter((person) => {
    return !players.includes(person.role);
  });

  return (
    <div className="roster-container">
      <div className="rosters">
        <div className="team border">
          <div className="players-container">
            Players
            {"\n"}
            {teamOnePlayers.map((data) => {
              return (
                <div key={data.name} className="roster-person">
                  <img
                    className="person-img"
                    src={data.img}
                    alt={data.name}
                  ></img>
                  <div className="person-name">
                    <div className="font-12 bold">{data.ign}</div>
                    <div className="font-12">{data.name}</div>
                    <div className="font-12 role">{data.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="players-container">
            Staff
            {"\n"}
            {teamOneStaff.map((data) => {
              return (
                <div key={data.name} className="roster-person">
                  <img
                    className="person-img"
                    src={data.img}
                    alt={data.name}
                  ></img>
                  <div className="person-name">
                    <div className="bold font-12">{data.ign}</div>
                    <div className="font-12">{data.name}</div>
                    <div className="role font-12">{data.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="team">
          <div className="players-container">
            Players
            {"\n"}
            {teamTwoPlayers.map((data) => {
              return (
                <div key={data.name} className="roster-person">
                  <img
                    className="person-img"
                    src={data.img}
                    alt={data.name}
                  ></img>
                  <div className="person-name">
                    <div className="font-12 bold">{data.ign}</div>
                    <div className="font-12">{data.name}</div>
                    <div className="font-12 role">{data.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="players-container">
            Staff
            {"\n"}
            {teamTwoStaff.map((data) => {
              return (
                <div key={data.name} className="roster-person">
                  <img
                    className="person-img"
                    src={data.img}
                    alt={data.name}
                  ></img>
                  <div className="person-name">
                    <div className="bold font-12">{data.ign}</div>
                    <div className="font-12">{data.name}</div>
                    <div className="role font-12">{data.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roster;
