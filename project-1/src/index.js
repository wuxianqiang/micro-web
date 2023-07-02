import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import Home from './Home';
import About from './About';

// const root = document.getElementById('root')
// createRoot(root).render(<App/>)

export function Root(props) {
  return <App>{props.children}</App>
}

export async function bootstrap() {
  console.log('project1启动')
}

export const routes = [
  {
    path: 'home',
    element: <Home/>
  },
  {
    path: 'about',
    element: <About/>
  }
]

