'use client';
import React from 'react';

import Spinner from '../Spinner';

function Counter() {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    const savedCount = window.localStorage.getItem('saved-count');
    if (savedCount === null) {
      return;
    }
    setCount(savedCount ? Number(savedCount) : 0);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('saved-count', count);
  }, [count]);

  return (
    <button className="count-btn" onClick={() => setCount(count + 1)}>
      Count: {typeof count === 'number' ? count : <Spinner />}
    </button>
  );
}

export default Counter;
