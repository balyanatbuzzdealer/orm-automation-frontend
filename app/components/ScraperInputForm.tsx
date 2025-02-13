"use client";

import { useState, useEffect } from "react";
import googleDomains from "./googleDomains.json" assert { type: "json" };

export default function ScraperInputForm() {
  const [googleLocation, setGoogleLocation] = useState("google.com");
  const [keywords, setKeywords] = useState("");
  const [searches, setSearches] = useState(10);
  const [fileLinks, setFileLinks] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(".");

  const prod_url =
    "https://orm-automation-tool-0494f308f710.herokuapp.com/scrape";
  const dev_url = "http://127.0.0.1:8000/scrape";

  const BACKEND_URL = prod_url;

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev === "..." ? "." : prev + "."));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    theInput: string
  ) {
    const { value } = e.target;

    if (theInput === "domain-selector") {
      setGoogleLocation(value);
    } else if (theInput === "keywords") {
      setKeywords(value);
    } else if (theInput === "searches") {
      setSearches(Number(value));
    }
  }

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("country", String(googleLocation));
    formData.append("search_terms", String(keywords));
    formData.append("num_results", String(searches));

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from backend: ", data);
      setFileLinks(data.files);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={formSubmit} className="form">
        <div className="form-group">
          <label htmlFor="google-countries">Select your Google domain</label>
          <select
            name="google-countries"
            id="google-countries"
            value={googleLocation}
            onChange={(e) => handleInputChange(e, "domain-selector")}
            className="select"
          >
            <option value="google.com">google.com - Global</option>
            {googleDomains.map((area) => (
              <option value={area.domain} key={area.domain}>
                {area.domain} - {area.location}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="keywords">
            Enter your keywords separated by a comma
          </label>
          <input
            type="text"
            name="keywords"
            id="keywords"
            required
            value={keywords}
            placeholder="keyword1, keyword2"
            onChange={(e) => handleInputChange(e, "keywords")}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="searches">
            Enter how many searches you'd like to retrieve
          </label>
          <input
            type="number"
            pattern="[0-9]*"
            name="searches"
            id="searches"
            placeholder="8"
            value={searches}
            onChange={(e) => handleInputChange(e, "searches")}
            className="input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit Scrape Request
        </button>
      </form>

      {loading && <div className="loading">Scraping{dots}</div>}

      {fileLinks && (
        <div className="results">
          <h3>Download Results</h3>
          {Object.keys(fileLinks).map((searchTerm) => {
            const { csv, screenshot } = fileLinks[searchTerm];
            return (
              <div key={searchTerm} className="result-item">
                <h4>Results for: {searchTerm}</h4>
                <a
                  href={`${BACKEND_URL}/${csv}`}
                  download
                  className="download-link"
                  target="_blank"
                >
                  Download CSV
                </a>
                <a
                  href={`${BACKEND_URL}/${screenshot}`}
                  download
                  className="download-link"
                  target="_blank"
                >
                  Download Screenshot
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
