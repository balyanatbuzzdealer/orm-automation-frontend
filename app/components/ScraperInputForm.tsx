"use client";

import { SetStateAction, useEffect, useState } from "react";
import googleDomains from "./googleDomains.json" assert { type: "json" };

export default function ScraperInputForm() {
  const [googleLocation, setGoogleLocation] = useState("google.com");
  const [keywords, setKeywords] = useState("");
  const [searches, setSearches] = useState(10);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    theInput: String
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

    const formData = new FormData();
    formData.append("country", String(googleLocation));
    formData.append("search_terms", String(keywords));
    formData.append("num_results", String(searches));

    try {
      const response = await fetch(
        "https://orm-automation-tool-0494f308f710.herokuapp.com/scrape",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response from backend: ", data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          formSubmit(e);
        }}
      >
        <div>
          <label htmlFor="google-countries">Select your Google domain</label>
          <select
            name="google-countries"
            id="google-countries"
            value={googleLocation}
            onChange={(e) => handleInputChange(e, "domain-selector")}
          >
            <option value="google.com">google.com - Global</option>
            {googleDomains.map((area) => (
              <option value={area.domain} key={area.domain}>
                {area.domain} - {area.location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="keywords">
            Enter your keywords separated by a comma
          </label>
          <input
            type="text"
            name="keywords"
            id="keywords"
            value={keywords}
            placeholder="keyword1, keyword2"
            onChange={(e) => handleInputChange(e, "keywords")}
          />
        </div>
        <div>
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
          />
        </div>
        <button type="submit">Submit Scrape Request</button>
      </form>
    </div>
  );
}
