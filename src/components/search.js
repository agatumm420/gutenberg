import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { onChangeSearch } from "../GetData";
const styles = {
  icon: {
    width: 30,
    height: 30,
    color: "#ffff",
  },
  iconUnClicked: {
    width: 40,
    height: 40,
    color: "#ffff",
  },
  iconClicked: {
    width: 40,
    height: 40,
    color: "#D15B98",
  },
};
const SearchBar = (props) => {
  const [author, setAuthor] = useState("");
  const [term, setTerm] = useState("");
  const [clicked, setClicked] = useState(false);
  const [results, setResults] = useState([]);
  const onChange = (ev) => {
    if (ev.target.id == "author") {
      setAuthor(ev.target.value);
    }
    if (ev.target.id == "title") {
      setTerm(ev.target.value);
    }

    onChangeSearch(author, term).then((data) => {
      console.log(data.results);
      setResults(data.results);
      props.onChange(results);
    });
  };
  const onClick = () => {
    setClicked(!clicked);
  };
  return (
    <div className="search-box">
      <input
        className="search-bar"
        type="text"
        placeholder="serch author"
        onChange={onChange}
        onClick={onClick}
        id="author"
      />
      <input
        className="search-bar"
        type="text"
        placeholder="serch title"
        onChange={onChange}
        onClick={onClick}
        id="title"
      />
      <FontAwesomeIcon
        style={styles.icon}
        onClick={onClick}
        icon={faMagnifyingGlass}
      />
      {clicked ? <div className="check-boxes"></div> : null}
    </div>
  );
};
export default SearchBar;
