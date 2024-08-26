import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import Teams from "./pages/Teams";
import axios from "axios";
import SearchMatchup from "./pages/SearchMatchup";
import Team from "pages/Team";
import Matchup from "pages/Matchup";

const App = () => {
  const [teams, setTeams] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/teams`);
        setTeams(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/teams",
          element: <Teams teams={teams} />,
        },
        {
          path: "/team/:teamName",
          element: <Team />,
        },
        {
          path: "/matchup",
          element: <SearchMatchup teams={teams} />,
        },
        {
          path: "/matchup/:id",
          element: <Matchup />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
