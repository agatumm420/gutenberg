import React, { Component, useState, useEffect } from "react";
import Book from "./book";
import GetData from "../GetData";
import { Sorter, Filter } from "../GetData";
const BookStore = (props) => {
  const [books, SetBooks] = useState([]);
  const [sortMenu, SetSortMenu] = useState(false);
  const [filter, setFilter] = useState(false);
  const [genre, setGenre] = useState("");
  useEffect(() => {
    GetData().then((data) => {
      SetBooks(data.results);
    });
  }, []);
  useEffect(() => {
    if (props.results != null || props.results != undefined) {
      SetBooks(props.results);
    }
  }, [props.results]);
  const SortDropDown = (props) => {
    const Sort = (ev) => {
      Sorter(ev.target.id).then((data) => {
        SetBooks(data.results);
      });
    };
    const CompareTitleAsc = (a, b) => {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      if (titleA > titleB) {
        return -1;
      }
      if (titleA < titleB) {
        return 1;
      }
      return 0;
    };
    const CompareTitleDesc = (a, b) => {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      if (titleA > titleB) {
        return 1;
      }
      if (titleA < titleB) {
        return -1;
      }
      return 0;
    };
    const CompareAuthorAsc = (a, b) => {
      let nameA = a.authors[0].name.toUpperCase();
      let nameB = b.authors[0].name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    };
    const CompareAuthorDesc = (a, b) => {
      let nameA = a.authors[0].toUpperCase();
      let nameB = b.authors[0].toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    };
    const Popularity = (a, b) => {
      if (a.download_count > b.download_count) {
        return 1;
      }
      if (a.download_count < b.download_count) {
        return -1;
      }
      return 0;
    };
    if (props.results.length == 0) {
      return (
        <div className="sort-menu">
          <div onClick={Sort} id="ascending" className="menu-item">
            <p id="ascending"> ascending Gutenberg ID</p>
          </div>
          <div onClick={Sort} id="descending" className="menu-item">
            <p id="descending">descending Gutenberg ID</p>
          </div>
          <div onClick={Sort} id="popular" className="menu-item">
            <p id="popular">popularity</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="sort-menu">
          <div
            onClick={() => {
              books.sort(CompareAuthorAsc);
            }}
            id="ascending"
            className="menu-item"
          >
            <p id="ascending"> Authors name A-Z</p>
          </div>
          <div
            onClick={() => {
              books.sort(CompareAuthorDesc);
            }}
            id="ascending"
            className="menu-item"
          >
            <p id="ascending"> Authors name Z-A</p>
          </div>
          <div
            onClick={() => {
              books.sort(Popularity);
            }}
            id="ascending"
            className="menu-item"
          >
            <p id="ascending"> Popularity</p>
          </div>
          <div
            onClick={() => {
              books.sort(CompareTitleAsc);
            }}
            id="ascending"
            className="menu-item"
          >
            <p id="ascending"> Title A-Z</p>
          </div>
          <div
            onClick={books.sort(CompareTitleDesc)}
            id="ascending"
            className="menu-item"
          >
            <p id="ascending"> Title Z-A</p>
          </div>
        </div>
      );
    }
  };

  const Change = (ev) => {
    setGenre(ev.target.value);
    Filtr();
  };
  const Filtr = () => {
    if (props.results.length == 0) {
      Filter(genre).then((data) => {
        SetBooks(data.results);
      });
    } else {
      const Check = (value) => {
        let found = false;
        value.bookshelves.forEach((element) => {
          element.includes(genre) ? (found = true) : (found = false);
        });
        if (found) {
          return false;
        } else {
          return true;
        }
      };
      books.filter(Check);
    }
  };
  return (
    <div className="bookstore">
      <div className="sort-box">
        <div
          className="small-sort-div"
          onClick={() => {
            SetSortMenu(!sortMenu);
          }}
        >
          <p>Sort by..</p>
          {sortMenu ? <SortDropDown results={props.results} /> : null}
        </div>
        <div className="small-sort-div">
          {filter ? (
            <input className="filter-inp" type="text" onChange={Change} />
          ) : (
            <p
              onClick={() => {
                setFilter(!filter);
              }}
            >
              {" "}
              Filter by genre
            </p>
          )}
        </div>
      </div>
      {books.length != 0
        ? books.map((bookie) => {
            return (
              <Book
                book={bookie}
                title={bookie.title}
                authors={bookie.authors}
                image={bookie.formats["image/jpeg"]}
                languages={bookie.languages}
                genre={bookie.bookshelves}
                downloads={bookie.download_count}
                key={bookie.id}
              />
            );
          })
        : null}
    </div>
  );
};
export default BookStore;
