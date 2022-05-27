import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import BookStore from "./components/bookstore";
import SearchBar from "./components/search";
import { HashRouter as Router, BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Page from "./components/bookpage";
import Reader from "./components/reader";

function App() {
  const [results, setResults] = useState([]);
  const Change = (res) => {
    setResults(res);
  };
  return (
    <div className="App">
      <Header />
      <SearchBar onChange={Change} />

      <Router className="site" basename="/">
        <Routes>
          <Route exact path="/" element={<BookStore results={results} />} />
          <Route exact path="/page" element={<Page />} />
          <Route exact path="/reader" element={<Reader />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
