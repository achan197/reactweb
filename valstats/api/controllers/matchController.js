import { scrapeMatches } from "../scrapper.js";

export const getMatches = async (req, res) => {
  const match = await scrapeMatches(
    req.params.idOne,
    req.params.teamOne,
    req.params.idTwo,
    req.params.teamTwo
  );

  //console.log(match);
  return res.status(200).json(match);
};
