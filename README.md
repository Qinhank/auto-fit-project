# auto-fit-project

移动端的自适应一直是个老大难的问题，随着技术的不断更新，我试图在众多方案中找寻一种适合自己的，于是便有了这个项目。

它使用了vw单位替代px，保证页面能根据手机屏幕宽度不同完成自适应，又基于postcss的各种插件，让开发做的又很少，为了兼容问题还特意添加了viewport-units-buggyfill保证该方案能顺利在各种浏览器上运行

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
