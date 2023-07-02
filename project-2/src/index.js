import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import Blog from './Blog';

// const root = document.getElementById('root')
// createRoot(root).render(<App/>)

export function Root(props) {
  return <App>{props.children}</App>
}

export async function bootstrap() {
  console.log('project2启动')
}

export const routes = [
  {
    path: 'blog',
    element: <Blog/>
  },
]

