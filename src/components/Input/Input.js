import React, { useState } from 'react';
import Search from '../Search/Search';

export default function Input() {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const clickHandler = () => {
    setSearchTerm(input);
    setPage(1);
  };

  return (
    <div>
      <input onChange={e => inputHandler(e)}></input>
      <button disabled={input === ''} onClick={clickHandler}>
        Search
      </button>
      <Search searchTerm={searchTerm} page={page} setPage={setPage} />
    </div>
  );
}
