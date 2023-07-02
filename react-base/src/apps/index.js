import { createRoot } from 'react-dom/client';
import React from 'react';
import App from '../App'

const apps = [];
let activeApp = null;
let linksToRemove = [];

const defaultApp = {
  name: 'project-default',
  entry: null,
  load() {
    return import('../config/defaultApp');
  },
};

function getAppNames() {
  return apps.map((app) => app.name);
}

export function registerApplication(config) {
  if (getAppNames().indexOf(config.name) !== -1) {
    throw Error(`There is already an registered app named ${config.name}`);
  }
  apps.push(config);
}

export default async function loadJson(url) {
  try {
    const response = await fetch(url, {mode: 'cors'});
    return await response.json();
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

export function start(rootElement) {
  window.addEventListener('load', () => {
    const path = location.hash.slice(1);
    appPerformanceChange(rootElement, path)
  })

  window.addEventListener('hashchange', () => {
    console.log(' hang change ===？')
    const path = location.hash.slice(1);
    appPerformanceChange(rootElement, path)
  })
}

async function appPerformanceChange (rootElement, path) {
  let nextApp = apps.find((app) => {
    return app.activeWhen(path)
  })
  nextApp = nextApp || defaultApp;
  if (nextApp !== activeApp) {
    activeApp = nextApp;
    // 加载JDON文件
    const importMap = await loadJson(activeApp.entry);
    if (!importMap) {
      return console.log('加载子应用出错：', activeApp.name)
    }
    System.addImportMap(importMap);
    // 加载路由文件
    const runtimeConfig = await activeApp.load()
    const appContext = Object.create(null);
    appContext.routes = runtimeConfig.routes;
    appContext.Root = runtimeConfig.Root;
    // 挂载到页面渲染
    const root = createRoot(rootElement);
    root.render(<App app={appContext} />);
  }
  return null
}
