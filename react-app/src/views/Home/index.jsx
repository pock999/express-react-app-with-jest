import React from 'react';
import { Link } from 'react-router-dom';

const View = () => {
  React.useEffect(() => {}, []);

  return (
    <>
      Home
      <Link to="/login">登入</Link>
    </>
  );
};

export default View;
