import React, { useEffect, useState } from 'react';
import gitHubSearch from '../../services/DataService';

export default function Search({ request }) {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [numeration, setNumeration] = useState(0);
  const [direction, setDirection] = useState('+');

  useEffect(() => {
    if (request !== null) {
      gitHubSearch(`${request}+sort:stars&per_page=20&page=${page}`)
        .then((response) => {
          setSearchResults(response.data.items);
          if (page !== 1)
            direction === '+'
              ? setNumeration(prev => prev + 20)
              : setNumeration(prev => prev - 20);
        })
        .catch((error) => {
          console.log(error);
          setSearchResults([
            {
              name: '403 Forbidden. Please wait few seconds, reload and try again',
              html_url: '/',
            },
          ]);
          setPage(1);
          setNumeration(0);
        });
    }
  }, [request, page, setSearchResults, direction]);

  useEffect(() => {
    setNumeration(0);
  }, [request]);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
    setDirection('+');
  };

  const handlePreviousPage = () => {
    setPage(prev => prev - 1);
    setDirection('-');
  };

  return (
    <div>
      {searchResults &&
        searchResults.map((item, i) => (
          <div key={item.id}>
            {numeration + i + 1}. <a href={item.html_url}>{item.name}</a>
          </div>
        ))}
      <div>
        <button disabled={page === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <button
          disabled={
            searchResults === [] ||
            (searchResults !== null && searchResults.length < 20)
          }
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
