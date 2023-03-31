import React, { useState } from 'react';
import Search from '../Search/Search';

export default function Input() {
  const [input, setInput] = useState('');
  const [request, setRequest] = useState(null);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const clickHandler = () => {
    setRequest(input);
  };

  return (
    <div>
      <input onChange={e => inputHandler(e)}></input>
      <button disabled={input === ''} onClick={clickHandler}>Search</button>
      <Search request={request} />
    </div>
  );
}
