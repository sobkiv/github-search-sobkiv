import React, { useEffect, useState } from 'react';
import fetchGitHubData from '../../services/DataService';
import ListItem from '../ListItem/ListItem';
import { useErrorBoundary } from 'react-error-boundary';
import { v4 as uuidv4 } from 'uuid';

export default function Search({ searchTerm = '', page, setPage }) {
  const [searchResults, setSearchResults] = useState([]);
  const [numeration, setNumeration] = useState(0);
  const [direction, setDirection] = useState('+');
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (searchTerm !== '') {
      fetchGitHubData(`${searchTerm}+sort:stars&per_page=20&page=${page}`)
        .then(({ data: { items } }) => {
          setSearchResults(items);
          if (page !== 1) {
            direction === '+'
              ? setNumeration((prev) => prev + 20)
              : setNumeration((prev) => prev - 20);
          } else {
            setNumeration(0);
            setPage(1);
            setDirection('+');
          }
        })
        .catch((error) => {
          showBoundary(error);
        });
    }
  }, [searchTerm, page, direction, setPage, showBoundary]);

  const handlePageChange = (delta) => {
    setPage((prev) => prev + delta);
    setDirection(delta > 0 ? '+' : '-');
  };

  return (
    <div>
      {searchResults?.map((item, i) => (
        <ListItem
          key={uuidv4()}
          index={numeration + i + 1}
          name={item.name}
          url={item.html_url}
        />
      ))}

      <div>
        <button disabled={page === 1} onClick={() => handlePageChange(-1)}>
          Previous
        </button>
        <button
          disabled={searchResults?.length < 20}
          onClick={() => handlePageChange(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
