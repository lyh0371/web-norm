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

## 在老项目中使用

在老项目使用会牵扯到一个问题就是以前的代码规范和通过`web-norm`生成的代码规范不一致怎么办？

1、如果项目比较小，只有几个文件，你可以把所以的文件都保存一遍即可（保存的时候 vscode 会自动格式化代码，确保使用 vscode 编辑器并安装 eslint 和 pretter 插件）

<img src="./src/static/Jun-20-2022-1.gif" width="60%">

2、如果项目比较大，建议使用 vscode 插件`Format Files`进行自动化保存

<img src="./src/static/Jun-20-2022-2.gif" width="100%">

## 说明

1、目前 `web-norm` 只支持 vue2 项目，后续会支持 vue3 react 项目
2、在使用过程中遇到任何问题，请提交 issues
