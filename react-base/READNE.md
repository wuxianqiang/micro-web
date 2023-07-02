# 微前端实践

微前端主应用

1. 多项目要复用 react react-dom 框架
2. 多项目要复用封装的基础 JS 能力


```js
<script type="systemjs-importmap">
    {
      "imports": {
        "react": "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
        "react-router-dom": "https://cdn.jsdelivr.net/npm/react-router-dom@6.14.1/dist/umd/react-router-dom.production.min.js",
        "react-router": "https://cdn.jsdelivr.net/npm/react-router@6.14.1/dist/umd/react-router.production.min.js",
        "@remix-run/router": "https://cdn.jsdelivr.net/npm/@remix-run/router@1.7.1/dist/router.umd.min.js"
      }
    }
  </script>
```