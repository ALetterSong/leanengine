# Node.js 云引擎 

云引擎（LeanEngine）是 LeanCloud 推出的服务端托管平台。提供了多种运行环境（Node.js, Python 等）来运行服务端程序。
你只需要提供服务端的业务逻辑（网站或云函数等），而服务端的多实例负载均衡，不中断服务的平滑升级等都由云引擎提供支持。

一个简单的使用 Express 4 的 Node.js 应用。
一个简单的使用 微信公众号 的 Node.js 应用。
可以运行在 LeanEngine Node.js 运行时环境。

## 本地运行

首先确认本机已经安装 [Node.js](http://nodejs.org/) 运行环境和 [LeanCloud 命令行工具](https://www.leancloud.cn/docs/leanengine_cli.html)，然后执行下列指令：

```
$ git clone 
```

安装依赖：

```
npm install
```

关联应用：

```
lean app add origin <appId>
```

这里的 appId 填上你在 LeanCloud 上创建的某一应用的 appId 即可。origin 则有点像 Git 里的 remote 名称。

启动项目：

```
lean up
```

应用即可启动运行：[localhost:3000](http://localhost:3000)

## 部署到 LeanEngine

部署到预备环境（若无预备环境则直接部署到生产环境）：
```
lean deploy
```

将预备环境的代码发布到生产环境：
```
lean publish
```

## 相关文档

* [LeanEngine 总览](https://leancloud.cn/docs/leanengine_overview.html)
* [网站托管开发指南 · Node.js](https://leancloud.cn/docs/leanengine_webhosting_guide-node.html)
* [微信公众平台开发指南](https://leancloud.cn/docs/webhosting_weixin.html)
* [JavaScript SDK](https://leancloud.cn/docs/sdk_setup-js.html)
* [JavaScript SDK API](https://leancloud.cn/api-docs/javascript/index.html)
* [命令行工具](https://leancloud.cn/docs/leanengine_cli.html)
