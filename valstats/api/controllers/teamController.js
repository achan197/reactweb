import { scrapeMapStats, scrapeTeam, scrapeTeams } from "../scrapper.js";

export const getTeams = async (req, res) => {
  var allTeams = {};
  const teamsNA = await scrapeTeams("north-america");
  allTeams = Object.assign(allTeams, teamsNA);
  const teamsEurope = await scrapeTeams("europe");
  allTeams = Object.assign(allTeams, teamsEurope);
  const teamsBrazil = await scrapeTeams("brazil");
  allTeams = Object.assign(allTeams, teamsBrazil);
  const teamsAsiaPacific = await scrapeTeams("asia-pacific");
  allTeams = Object.assign(allTeams, teamsAsiaPacific);
  const teamsKorea = await scrapeTeams("korea");
  allTeams = Object.assign(allTeams, teamsKorea);
  const teamsChina = await scrapeTeams("china");
  allTeams = Object.assign(allTeams, teamsChina);
  const teamsjapan = await scrapeTeams("japan");
  allTeams = Object.assign(allTeams, teamsjapan);
  const teamsLAS = await scrapeTeams("la-s");
  allTeams = Object.assign(allTeams, teamsLAS);
  const teamsLAN = await scrapeTeams("la-n");
  allTeams = Object.assign(allTeams, teamsLAN);

  //console.log(allTeams);
  return res.status(200).json(allTeams);
};

export const getTeam = async (req, res) => {
  const team = await scrapeTeam(req.params.id, req.params.team);

  //console.log(team);
  return res.status(200).json(team);
};

export const getMapStats = async (req, res) => {
  const table = await scrapeMapStats(
    req.params.idOne,
    req.params.teamOne,
    req.params.idTwo,
    req.params.teamTwo
  );
  //console.log(table);
  return res.status(200).json(table);
};
