import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
  const [people, setPeople] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const selectPerson = (newIndex, e) => {
    setIndex(newIndex);
    let parent = document.querySelectorAll('.job-btn');
    let buttons = Array.from(parent);

    for (let button of buttons) {
      if (button === e.target) button.classList.add("active-btn");
      else button.classList.remove("active-btn");
    }
  };

  const getData = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    setPeople(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData(url);
  }, []);

  return (
    <main className="section">
      {isLoading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <>
          <header className="title">
            <h2>Experience</h2>
            <div className="underline"></div>
          </header>
          <section className="jobs-center">
            <article className="btn-container">
              {people.map((person, index) => {
                if (index === 0) {
                  return (
                    <button
                      type="button"
                      className="job-btn active-btn"
                      onClick={(e) => selectPerson(index, e)}
                    >
                      {person.company}
                    </button>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      className="job-btn"
                      onClick={(e) => selectPerson(index, e)}
                    >
                      {person.company}
                    </button>
                  );
                }
              })}
            </article>
            <article className="job-info">
              <h3>{people[index].title}</h3>
              <h4>{people[index].company}</h4>
              <p className="job-date">{people[index].dates}</p>
              {people[index].duties.map((duty) => {
                return (
                  <div className="job-desc">
                    <FaAngleDoubleRight className="job-icon" />
                    <p>{duty}</p>
                  </div>
                );
              })}
            </article>
          </section>
          <button className="btn">more info</button>
        </>
      )}
    </main>
  );
}

export default App;
