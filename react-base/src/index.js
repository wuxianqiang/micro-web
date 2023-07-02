import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import { registerApplication } from './apps/index';
import { start } from './apps/index'

registerApplication({
  name: 'project1',
  entry: 'http://localhost:8001/import-map.json',
  load() {
    return System.import('project1/runtime');
  },
  activeWhen() {
    return true;
  },
});
registerApplication({
  name: 'project2',
  entry: 'http://localhost:8002/import-map.json',
  load() {
    return System.import('project2/runtime');
  },
  activeWhen() {
    return '/blog';
  },
});

const root = document.getElementById('root')

start(root)
