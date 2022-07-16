import React, { useState, useEffect } from "react";
import "./Card.css";

const About = () => {
  const [characters, setCharacters] = useState({});
  const [error, setError] = useState(null);

  const getCharacters = () => {
    fetch("https://rickandmortyapi.com/api/episode")
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data");
        }
        return res.json();
      })
      .then((data) => setCharacters(data.info))
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <React.Fragment>
      {(error && <div className="error">{error}</div>) || (
        <div>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="txt"
          >
            Some information about Rick n Morty.
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="txt"
          >
            The series follows the misadventures of cynical mad scientist Rick
            Sanchez and his good-hearted, but fretful grandson Morty Smith, who
            split their time between domestic life and interdimensional
            adventures.
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="txt"
          >
            There are {characters.count} episodes in Rick n Morty.
          </p>
        </div>
      )}
    </React.Fragment>
  );
};
export default About;
