import React, { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import About from "./components/About";

const App = () => {
  const [about, setAbout] = useState(false);

  const aboutHandler = () => {
    if (!about) {
      setAbout(true);
    } else {
      setAbout(false);
    }
  };

  return (
    <div className="body">
      <header className="header">
        <button
          onClick={() => {
            window.location.reload(false);
          }}
          className="button"
        >
          Main Page
        </button>

        <button onClick={aboutHandler} className="button">
          About
        </button>
      </header>
      <Header />
      {about && <About />}
      <Card />
    </div>
  );
};

export default App;
