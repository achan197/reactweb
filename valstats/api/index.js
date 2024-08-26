import express from "express";
import teamRoutes from "./routes/teams.js";
import matchRoutes from "./routes/match.js";

const app = express();

app.use(express.json());
app.use("/api/teams", teamRoutes);
app.use("/api/matchups", matchRoutes);

app.listen(3001, () => {
  console.log("connected!");
});
