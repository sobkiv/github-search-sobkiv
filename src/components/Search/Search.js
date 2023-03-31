import React, { useEffect, useState } from 'react';
import gitHubSearch from '../../services/DataService';

export default function Search({ request }) {
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(1);
  let [numeration, setNumeration] = useState(0)

  useEffect(() => {
    if (request !== null) {
      gitHubSearch(`${request}+sort:stars&per_page=20&page=${page}`)
      .then(response => {
        setSearchResults(response.data.items);
      })
      .catch(error => {
        console.log(error);
        setSearchResults([{ name: "403 Forbidden. Please wait few seconds, reload and try again"}]);
        setNumeration(0);
      });
    }
  }, [request, page]);

  const handleNextPage = () => {
    setPage(page + 1);
    setNumeration(prev => prev + 20);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
    setNumeration(prev => prev - 20);
  };
  console.log(searchResults);
  return (
    <div>
        {searchResults && searchResults.map(item => (
          <div key={item.id}>
            {++numeration}. <a href={item.html_url}>{item.name}</a>
          </div>
        ))}
      <div>
        <button disabled={page === 1} onClick={handlePreviousPage}>Previous</button>
        <button disabled={searchResults !== null && searchResults.length < 20} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}
