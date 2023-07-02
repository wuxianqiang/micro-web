import React, { useEffect } from 'react';
import {useParams, Link, Outlet} from 'react-router-dom';

function Header () {
  const params = useParams();
  useEffect(() => {
    console.log('222', params)
  }, [])
  return (
    <div>
      <div>header</div>
      <Link to="/about">/about</Link>
      <Link to="/home">/home</Link>
      <Link to="/blog">/blog</Link>
      <Link to="/">/</Link>
      <Outlet />
      <div>footer</div>
    </div>
  )
}

export default Header;
