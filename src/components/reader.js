import React, { useState, useEffect, useRef } from "react";
import { ReactReader } from "react-reader";
import { EpubViewer, ReactEpubViewer } from "react-epub-viewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// useEffect(() => {
//   let bookie = JSON.parse(localStorage.getItem("book"));
//   let unsliced = bookie.formats["application/epub+zip"];
//   let sliced = unsliced.slice(0, -7);
//   setUrl(sliced); //clip if necesary

//   setLocation(sliced);
// }, []);
const keyDownEv = ["keydown", "keypressed", "keyup"];
function simulateLeftClick(element) {
  keyDownEv.forEach((keyEventType) =>
    element.dispatchEvent(
      new KeyboardEvent(keyEventType, {
        keyCode: 37,
        key: "ArrowLeft",
      })
    )
  );
}
function simulateRightClick(element) {
  keyDownEv.forEach((keyEventType) =>
    element.dispatchEvent(
      new KeyboardEvent(keyEventType, {
        keyCode: 38,
        key: "ArrowRight",
      })
    )
  );
}
const styles = {
  icon: {
    width: 50,
    height: 50,
  },
};
const Reader = () => {
  const viewerRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    let bookie = JSON.parse(localStorage.getItem("book"));
    let unsliced = bookie.formats["application/epub+zip"];
    let sliced = unsliced.slice(0, -7);
    setUrl(sliced); //clip if necesary
  }, []);
  const onClick = (ev) => {
    simulateLeftClick(document);
  };
  const onClick2 = (ev) => {
    simulateRightClick(document);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        paddingTop: "30px",
        paddingBottom: "100px",
        paddingLeft: "10px",
        paddingRight: "10px",
        backgroundColor: "#ffff",
      }}
    >
      <div className="exit-div">
        <button className="btn-reading">
          {" "}
          Exit the Reading Room{" "}
          <FontAwesomeIcon
            style={styles.icon}
            icon={faCircleXmark}
            id="x"
          />{" "}
        </button>
      </div>
      <ReactEpubViewer
        url={url}
        ref={viewerRef}
        onPageChange={(page) => {
          console.log(page);
          setPage(page.currentPage);
          setTotal(page.totalPage);
          setChapter(page.chapterName);
        }}
      />
      <button onClick={onClick} className="reader-arrow-left">
        <FontAwesomeIcon style={styles.icon} icon={faChevronLeft} />
      </button>
      <button onClick={onClick2} className="reader-arrow-right">
        <FontAwesomeIcon style={styles.icon} icon={faChevronRight} />
      </button>
      <div className="info-div">
        {chapter != 0 || chapter != undefined ? (
          <p>Chapter : {chapter}</p>
        ) : null}

        <p>
          {page}/{total}
        </p>
      </div>
    </div>
  );
};
export default Reader;
