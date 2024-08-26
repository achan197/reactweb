import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Team = (props) => {
  const [info, setInfo] = useState({ name: "", shortName: "" });
  const location = useLocation();
  const name = location.state.name;
  const logo = location.state.logo;
  const region = location.state.region;
  const country = location.state.country;
  const url_id = location.state.url_id;

  //useEffect to get data from /teams/:id/name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/teams/${url_id}/${name}`);
        setInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="teams_page">
      <div>
        <h1>{info.name}</h1>
        <p>
          <img src={logo} alt="logo"></img>
        </p>
        <p>{info.shortName}</p>
      </div>
    </div>
  );
};

export default Team;
