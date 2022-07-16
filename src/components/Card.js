import React, { useState, useEffect } from "react";
import "./Card.css";
import Search from "./Search";

const Card = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const apiLink = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const getCharacters = () => {
    fetch(apiLink)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data.");
        }
        return res.json();
      })
      .then((data) => setCharacters(data.results))
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    getCharacters();
  }, [apiLink]);

  const nextPageNumberHandler = () => {
    if (pageNumber < 42) {
      setPageNumber(pageNumber + 1);
      window.scrollTo(0, 540);
    }
  };

  const previousPageNumberHandler = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="search">
        <Search onClick={searchHandler} />
      </div>
      {error && <div className="error">{error}</div>}
      {characters.length > 0 && (
        <div className="maincard">
          {characters
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              } else if (
                item.status.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              } else if (
                item.species.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              } else if (
                item.gender.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
              return null;
            })
            .map((item) => (
              <div key={item.id} className="card">
                <img alt="Character" className="image" src={item.image} />
                <div className="info">
                  <p className="txt">Name : {item.name}</p>
                  <p className="txt">Status : {item.status}</p>
                  <p className="txt">Species : {item.species}</p>
                  <p className="txt">Gender : {item.gender}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="bottom__nav">
        <button
          className="bottom__navbutton"
          onClick={previousPageNumberHandler}
        >
          Previous
        </button>
        <p className="bottom__navtext">Page: {pageNumber}</p>
        <button className="bottom__navbutton" onClick={nextPageNumberHandler}>
          Next
        </button>
      </div>
    </React.Fragment>
  );
};

export default Card;
