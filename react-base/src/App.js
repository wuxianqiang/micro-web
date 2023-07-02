import React, { useEffect } from 'react'
import { RouterProvider, createHashRouter, createBrowserRouter } from 'react-router-dom';
import history from '@project/history';
import Root from './Root'


function App (props) {
  const router = createHashRouter([
    {
      path: '/',
      element: <Root />,
      children: props.app.routes,
    },
  ]);
  console.log(router)
  return (
    <div className="project-core">
      {React.createElement(props.app.Root, {}, <RouterProvider router={router} />)}
    </div>
  )
}

export default App;
