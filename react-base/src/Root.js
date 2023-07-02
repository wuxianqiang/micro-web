import React, { useEffect } from 'react';
import {useParams, useLocation, useMatch} from 'react-router-dom';
import Header from './Header';

function Root () {
  const params = useParams();
  const location = useLocation();
  return (
    <div>
      Header
      <Header />
    </div>
  )
}

export default Root;
