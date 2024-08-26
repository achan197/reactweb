import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export const Card = (props) => {
  const name = props.name;
  const logo = props.logo;
  const country = props.country;
  const region = props.region;
  const url_id = props.url_id;
  //const url = `/team?id=${url_id}&?name=${name.replace(" ", "-")}`;
  const onMouseOver = props.onMouseOver;
  const onMouseLeave = props.onMouseLeave;
  const className = props.className;
  const id = props.id;

  return (
    <div className="card-container">
      <Link
        to={`/team/${name}`}
        state={{
          name: name,
          logo: logo,
          country: country,
          region: region,
          url_id: url_id,
        }}
        className="overlay-link"
      >
        <div
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          className={`${className} card`}
          id={id}
        >
          <div className="team-info" data-sort-value={name}>
            <div className="test">
              <img className="team-logo" src={logo} alt="team-name"></img>
              <div>
                <div className="content">
                  <div className="name">{name}</div>
                  <div className="region">{region}</div>
                </div>
                <div className="country">{country}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
