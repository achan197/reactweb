import axios from "axios";
import cheerio from "cheerio";

// get all teams in competitive valorant across all regions
export async function scrapeTeams(region) {
  const teams = {};
  const regionAbbr = {
    "north-america": "NA",
    europe: "EU",
    brazil: "BR",
    "asia-pacific": "APAC",
    korea: "KR",
    china: "CN",
    japan: "JP",
    "la-s": "LA-S",
    "la-n": "LA-N",
  };

  const { data } = await axios.get(`https://www.vlr.gg/rankings/${region}`);

  const $ = cheerio.load(data);

  $(".rank-item-team").each((index, element) => {
    teams[$(element).attr("data-sort-value").trim()] = {
      name: $(element).attr("data-sort-value").trim(),
      url_id: $(element).attr("href").split("/")[2],
      logo: $(element).children("img").attr("src").includes("vlr.png")
        ? "//vlr.gg" + $(element).children("img").attr("src")
        : $(element).children("img").attr("src"),
      country: $(element).find(".rank-item-team-country").text(),
      region: regionAbbr[region],
    };
  });

  return teams;
}

// get a single teams short info
export async function scrapeTeam(id, name) {
  var info = {};
  const url = "https://www.vlr.gg/team/" + id + "/" + name;

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  //get team's general info
  info["logo"] = $(".team-header-logo").find("img").attr("src");
  info["name"] = name;
  info["shortName"] = $(".team-header-tag").text();
  info["country"] = $(".team-header-country").text().trim();

  //populate team's roster info
  info.roster = [];
  $("div.team-roster-item > a").each((i, e) => {
    var img = $(e).find("a > div.team-roster-item-img > img").attr("src");
    if (!img.includes("owcdn")) {
      img = "//vlr.gg" + img;
    }
    const name = $(e)
      .find("a > div.team-roster-item-name > div.team-roster-item-name-real")
      .text()
      .trim();
    const ign = $(e)
      .find("a > div.team-roster-item-name > div.team-roster-item-name-alias")
      .text()
      .trim();
    var role = $(e)
      .find("a > div.team-roster-item-name > div.team-roster-item-name-role")
      .text()
      .trim();
    role = role ? role : "player";
    info.roster.push({ img: img, name: name, ign: ign, role: role });
  });

  return info;
}

// get all matches for 2 teams
export async function scrapeMatches(idOne, nameOne, idTwo, nameTwo) {
  var info = {};
  const url = "https://www.vlr.gg/team/matches/" + idOne + "/" + nameOne;

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const item = $("div#wrapper");

  // Extract the first page matchups
  $(item)
    .find("#wrapper > div.col-container > div > div.mod-dark > div")
    .each((index, element) => {
      const team_name = $(element)
        .find("a > div.m-item-team.text-of.mod-right > span.m-item-team-name")
        .text();
      if (team_name.replace(/\s/g, "") === nameTwo.replace(/\s/g, "")) {
        const eventMatch = $(element)
          .find("a > div.m-item-event")
          .text()
          .replace(/[\t\n\r]/gm, "")
          .trim();
        info[eventMatch] = {
          match: $(element)
            .find("a > div.m-item-event")
            .contents()
            .not($(element).find("a > div.m-item-event").children())
            .text()
            .replace(/[\t\n\r]/gm, "")
            .trim(),
          event: $(element).find("a > div.m-item-event > div").text().trim(),
          url: $(element).find("a").attr("href"),
        };
        const result = $(element).find("a > div.m-item-result > span").text();
        info[eventMatch].score1 = result[0];
        info[eventMatch].score2 = result[1];
      }
    });

  // extract all other page urls
  var pages = [];
  $(item)
    .find(
      "#wrapper > div.col-container > div > div.action-container > div.action-container-pages > a"
    )
    .each((index, element) => {
      const pageUrl = $(element).attr("href");
      pages.push(pageUrl);
    });

  // loop through each page of matches and get matchups
  for await (const pageUrl of pages) {
    info = await scrapeMatchPage(info, nameTwo, pageUrl);
  }

  return info;
}

export async function scrapeMatchPage(info, opponent, pageUrl) {
  const url = "https://www.vlr.gg" + pageUrl;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const item = $("div#wrapper");

  // Extract the data that we need

  $(item)
    .find("#wrapper > div.col-container > div > div.mod-dark > div")
    .each((index, element) => {
      const team_name = $(element)
        .find("a > div.m-item-team.text-of.mod-right > span.m-item-team-name")
        .text();
      if (team_name.replace(/\s/g, "") === opponent.replace(/\s/g, "")) {
        const eventMatch = $(element)
          .find("a > div.m-item-event")
          .text()
          .replace(/[\t\n\r]/gm, "")
          .trim();
        info[eventMatch] = {
          match: $(element)
            .find("a > div.m-item-event")
            .contents()
            .not($(element).find("a > div.m-item-event").children())
            .text()
            .replace(/[\t\n\r]/gm, "")
            .trim(),
          event: $(element).find("a > div.m-item-event > div").text().trim(),
          url: $(element).find("a").attr("href"),
        };
        const result = $(element).find("a > div.m-item-result > span").text();
        info[eventMatch].score1 = result[0];
        info[eventMatch].score2 = result[1];
      }
    });

  return info;
}

export async function scrapeMapStats(idOne, teamOne, idTwo, teamTwo) {
  const tableOne = await getTeamMapStats(idOne, teamOne);
  tableOne.shift();
  const tableTwo = await getTeamMapStats(idTwo, teamTwo);
  tableTwo.shift();
  tableTwo.slice(2, 5);

  const desiredIndices = [0, 1, 2, 3, 4, 14, 15];
  var table1 = (await tableOne).map((obj) => {
    return obj.filter((ob, i) => {
      if (desiredIndices.includes(i)) return ob;
    });
  });
  var table2 = (await tableTwo).map((obj) => {
    return obj.filter((ob, i) => {
      if (desiredIndices.includes(i)) return ob;
    });
  });

  table1 = table1.sort((a, b) => a[0].localeCompare(b[0]));
  table2 = table2.sort((a, b) => a[0].localeCompare(b[0]));

  const mapOnly = (await table1).map((obj) => {
    return obj[1];
  });

  const order = [5, 2, 3, 4];
  table1 = (await table1).map((obj) => {
    return order.map((i) => obj[i]);
  });

  const slice = (table2) => table2.slice(-4);
  table2 = table2.map(slice);
  const headers = [
    "Most Played",
    "Win %",
    "W",
    "L",
    "W",
    "L",
    "Win%",
    "Map",
    "Win%",
    "W",
    "L",
    "Win%",
    "W",
    "L",
    "Most Played",
  ];

  // var table = table1.map((item1, i) => {
  //   const item2 = table2[i];
  //   return item1.concat(item2);
  // });
  // table.unshift(headers);

  const matchUrls = await scrapeMatchesUrl(idOne, teamOne, idTwo, teamTwo);
  const statsByMap = await getMapResults(matchUrls, teamOne, teamTwo);

  var teamOneVSMaps = [];
  var teamTwoVSMaps = [];
  for (var map in statsByMap) {
    const totalgames = statsByMap[map][teamOne] + statsByMap[map][teamTwo];
    var win_p = "-";
    var win_p2 = "-";
    if (totalgames === 0) {
      win_p = "-";
      win_p2 = "-";
    } else {
      win_p =
        Math.round((statsByMap[map][teamOne] / totalgames) * 100).toString() +
        "%";
      win_p2 =
        Math.round((statsByMap[map][teamTwo] / totalgames) * 100).toString() +
        "%";
    }
    const row1 = [
      statsByMap[map][teamOne].toString(),
      statsByMap[map][teamTwo].toString(),
      win_p,
    ];
    const row2 = [
      win_p2,
      statsByMap[map][teamTwo].toString(),
      statsByMap[map][teamOne].toString(),
    ];
    teamOneVSMaps.push(row1);
    teamTwoVSMaps.push(row2);
  }

  var table = table1.map((teamOneCol, i) => {
    const teamOneVSCol = teamOneVSMaps[i];
    const mapCol = mapOnly[i];
    const teamTwoVSCol = teamTwoVSMaps[i];
    const teamTwoCol = table2[i];
    return teamOneCol
      .concat(teamOneVSCol)
      .concat(mapCol)
      .concat(teamTwoVSCol)
      .concat(teamTwoCol);
  });

  table.unshift(headers);

  return table;
}

export async function getMapResults(matchUrls, teamOne, teamTwo) {
  const mapResults = {
    Abyss: { [teamOne]: 0, [teamTwo]: 0 },
    Ascent: { [teamOne]: 0, [teamTwo]: 0 },
    Bind: { [teamOne]: 0, [teamTwo]: 0 },
    Breeze: { [teamOne]: 0, [teamTwo]: 0 },
    Fracture: { [teamOne]: 0, [teamTwo]: 0 },
    Haven: { [teamOne]: 0, [teamTwo]: 0 },
    Icebox: { [teamOne]: 0, [teamTwo]: 0 },
    Lotus: { [teamOne]: 0, [teamTwo]: 0 },
    Pearl: { [teamOne]: 0, [teamTwo]: 0 },
    Split: { [teamOne]: 0, [teamTwo]: 0 },
    Sunset: { [teamOne]: 0, [teamTwo]: 0 },
  };

  for (const matchUrl of matchUrls) {
    const url = "https://www.vlr.gg" + matchUrl;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    //vm-stats-container
    //vm-stats-game not data-game-id="all"

    $(".vm-stats-container > .vm-stats-game")
      .filter(":not([data-game-id=all])")
      .each((index, element) => {
        var teamOne = "";
        var teamTwo = "";
        $(element)
          .find("div.vm-stats-game-header > div.team > div > div.team-name")
          .each((j, team) => {
            if (j === 0) teamOne = $(team).text().trim().replace(" ", "");
            else teamTwo = $(team).text().trim().replace(" ", "");
          });
        var roundsOne = "";
        var roundsTwo = "";
        $(element)
          .find("div.vm-stats-game-header > div.team > div.score")
          .each((j, rounds) => {
            if (j === 0) roundsOne = $(rounds).text().trim();
            else roundsTwo = $(rounds).text().trim();
          });
        const map = $(element)
          .find("div.vm-stats-game-header > div.map > div > span")
          .clone()
          .children()
          .remove()
          .end()
          .text()
          .trim();
        if (Number(roundsOne) > Number(roundsTwo))
          mapResults[map][teamOne] += 1;
        else mapResults[map][teamTwo] += 1;
      });
  }

  return mapResults;
}

export async function getTeamMapStats(id, name) {
  var table = [];
  const url = "https://www.vlr.gg/team/stats/" + id + "/" + name;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  $("tr")
    .not(".mod-toggle")
    .each((i, row) => {
      const rowData = [];
      $(row)
        .find("td, th")
        .each((j, cell) => {
          if (j !== 13 && j !== 1) {
            rowData.push($(cell).text().trim());
          }
          if (j === 0) {
            rowData.push($(cell).find("img").attr("src"));
          }
          if (j === 13) {
            var mostplayed = 0;
            var track = 0;
            $(cell)
              .find("td > div > div.agent-comp-agg")
              .each((k, comp) => {
                const compNum = $(comp)
                  .find("span")
                  .eq(1)
                  .text()
                  .trim()
                  .slice(1, -1);
                if (Number(compNum) > mostplayed) {
                  mostplayed = Number(compNum);
                  track = k;
                }
              });
            const agents = [];
            $(cell)
              .find("td > div > div.agent-comp-agg")
              .eq(track)
              .find("img")
              .each((l, agent) => {
                agents.push($(agent).attr("src"));
              });
            rowData.push(mostplayed);
            rowData.push(agents);
          }
        });
      table.push(rowData);
    });

  return table;
}

// get all matches for 2 teams
export async function scrapeMatchesUrl(idOne, nameOne, idTwo, nameTwo) {
  var info = [];
  const url = "https://www.vlr.gg/team/matches/" + idOne + "/" + nameOne;

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const item = $("div#wrapper");

  // Extract the first page matchups
  $(item)
    .find("#wrapper > div.col-container > div > div.mod-dark > div")
    .each((index, element) => {
      const team_name = $(element)
        .find("a > div.m-item-team.text-of.mod-right > span.m-item-team-name")
        .text();
      if (team_name.replace(/\s/g, "") === nameTwo.replace(/\s/g, "")) {
        const eventMatch = $(element)
          .find("a > div.m-item-event")
          .text()
          .replace(/[\t\n\r]/gm, "")
          .trim();
        info.push($(element).find("a").attr("href"));
      }
    });

  // extract all other page urls
  var pages = [];
  $(item)
    .find(
      "#wrapper > div.col-container > div > div.action-container > div.action-container-pages > a"
    )
    .each((index, element) => {
      const pageUrl = $(element).attr("href");
      pages.push(pageUrl);
    });

  // loop through each page of matches and get matchups
  for await (const pageUrl of pages) {
    info = await scrapeMatchPageUrl(info, nameTwo, pageUrl);
  }

  return info;
}

export async function scrapeMatchPageUrl(info, opponent, pageUrl) {
  const url = "https://www.vlr.gg" + pageUrl;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const item = $("div#wrapper");

  // Extract the data that we need

  $(item)
    .find("#wrapper > div.col-container > div > div.mod-dark > div")
    .each((index, element) => {
      const team_name = $(element)
        .find("a > div.m-item-team.text-of.mod-right > span.m-item-team-name")
        .text();
      if (team_name.replace(/\s/g, "") === opponent.replace(/\s/g, "")) {
        const eventMatch = $(element)
          .find("a > div.m-item-event")
          .text()
          .replace(/[\t\n\r]/gm, "")
          .trim();
        info.push($(element).find("a").attr("href"));
      }
    });

  return info;
}
