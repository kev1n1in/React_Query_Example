import { useState, useEffect } from 'react';
import "./CatFactsStyle.css";

function CatFacts() {
  const [data, setData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isError, setIsError] = useState(false); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = () => {
    setIsLoading(true);
    setIsError(false);
    setError("");
    fetch("https://catfact.ninja/fact")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.fact);
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setError(error.message);
        setData(null);
        setIsLoading(false);
      });
  };

  return (
    <div className="cat-facts-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error}</p>
      ) : (
        <p className="cat-fact">{data || "No fact available"}</p>
      )}
      <button className="button" onClick={fetchFact}>Fetch New Fact</button>
    </div>
  );
}

export default CatFacts;
