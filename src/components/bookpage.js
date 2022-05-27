import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faHeart,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
const styles = {
  icon: {
    width: 30,
    height: 30,
    color: "#E2E9E9",
  },
  iconUnClicked: {
    width: 40,
    height: 40,
    color: "#10EEFC",
  },
  iconClicked: {
    width: 40,
    height: 40,
    color: "#D15B98",
  },
};
const Page = (props) => {
  const [book, setBook] = useState({});
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    let bookie = JSON.parse(localStorage.getItem("book"));
    setBook(bookie);
  }, []);
  const onClick = () => {
    setRedirect(!redirect);
  };
  if (redirect) {
    return <Navigate to={"/reader"} />;
  }
  return (
    <div className="book-page">
      <div className="back-div">
        {" "}
        <p>Go back to browsing</p>
        <FontAwesomeIcon
          style={styles.icon}
          icon={faCircleArrowLeft}
          id="back-icon"
        />
      </div>
      <img
        className="book-page-img"
        src={book.formats ? book.formats["image/jpeg"] : null}
      />
      <p className="book-page-title">{book.title ? book.title : null}</p>
      <div className="small-book-div">
        {book.authors
          ? book.authors.map((author, index) => {
              return <p key={index}>{author.name}</p>;
            })
          : null}
      </div>
      <div className="small-book-div">
        {book.languages
          ? book.languages.map((lang, index) => {
              return <p key={index}>{lang}</p>;
            })
          : null}
      </div>
      <div className="small-book-div">
        <p>{book.title ? book.download_count : null}</p>
        <FontAwesomeIcon style={styles.iconUnClicked} icon={faDownload} />
      </div>
      <button className="read-me" onClick={onClick}>
        {" "}
        Read me
      </button>
    </div>
  );
};
export default Page;
