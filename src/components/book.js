import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
const styles = {
  icon: {
    width: 30,
    height: 30,
    color: "#B2D8D8",
  },
  iconUnClicked: {
    width: 40,
    height: 40,
    color: "#ffff",
  },
  iconClicked: {
    width: 40,
    height: 40,
    color: "#10EEFC",
  },
};

const Book = (props) => {
  const [hearted, SetHearted] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const OnClick = () => {
    SetHearted(!hearted);
  };
  const BookClicked = () => {
    let ready = JSON.stringify(props.book);
    localStorage.setItem("book", ready);
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={"/page"} />;
  }
  return (
    <div className="book-div">
      <img className="book-image" src={props.image} onClick={BookClicked} />
      <div className="title-div" onClick={BookClicked}>
        <p>{props.title}</p>
      </div>

      <div className="small-book-div" onClick={BookClicked}>
        {props.authors.map((author, index) => {
          return <p key={index}>{author.name}</p>;
        })}
      </div>
      <div className="small-book-div" onClick={BookClicked}>
        {props.languages.map((lang, index) => {
          return <p key={index}>{lang}</p>;
        })}
      </div>
      <div className="small-book-div" onClick={BookClicked}>
        {props.genre.map((gen, index) => {
          return <p key={index}>{gen}</p>;
        })}
      </div>
      <div className="small-book-div" onClick={BookClicked}>
        <p>{props.downloads}</p>
        <FontAwesomeIcon style={styles.icon} icon={faDownload} />
      </div>
      <div className="small-book-div">
        <FontAwesomeIcon
          style={hearted ? styles.iconClicked : styles.iconUnClicked}
          onClick={OnClick}
          icon={faHeart}
        />
        <p className="subtext">Heart me</p>
      </div>
    </div>
  );
};
export default Book;
