## 初衷

每当接手一个新项目（如果项目中没有配置 eslint husky commitlint）等这些规范的话，就需要自己手动配置一遍，配置多了后我只能来句窝草！

## 目标

一个命令自动化配置项目规范

## 使用

1. 全局安装

```sh
npm install web-norm -g | yarn add web-norm -g | pnpm install web-norm -g
```

运行命令

```sh
npm run web-norm
```

2 局部安装

```sh
npm install web-norm -D | yarn add web-norm -D | pnpm install web-norm -D
```

在 package.json 中

```sh
 "scripts": {
    "web": "web-norm",
  },
```

运行命令

```sh
npm run web
```

<img src="./src/static/loading.png" width="60%">

## 验证

运行命令

```sh
npm run commit
```

<img src="./src/static/eslint.png" width="60%">
