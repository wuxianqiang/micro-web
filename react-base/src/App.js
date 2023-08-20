import React, { useEffect } from 'react'
import { RouterProvider, createHashRouter, createBrowserRouter } from 'react-router-dom';
import history from '@project/history';
import Root from './Root'
import ErrorBoundary from './ErrorBoundary'


function App (props) {
   console.log(props.app.routes, 'innner router ===>')
  const router = createHashRouter([
    {
      path: '/',
      element: <Root />,
      children: props.app.routes,
      errorElement: <Root />
    },
  ]);
  return (
    <ErrorBoundary>
      <div className="project-core">
        {React.createElement(props.app.Root, {}, <RouterProvider router={router} />)}
      </div>
    </ErrorBoundary>
  )
}

export default App;
