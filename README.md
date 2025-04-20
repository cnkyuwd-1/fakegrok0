# FakeGrok Proxy

FakeGrok 是一个反向代理工具，允许用户输入 Grok.com 的 Cookie，并通过代理服务器访问目标网站。该工具提供了基本的 Cloudflare 盾检测功能。如果代理请求遇到 Cloudflare 盾，它将返回“盾”信息。

## 目录结构

grok-proxy/ │ ├── index.html // 用户输入 Cookie 的页面 ├── server.js // Node.js 服务器代码 ├── README.md // 项目的说明文件 └── package.json // 项目的依赖配置

markdown
复制

## 项目要求

1. **Node.js**：确保你的机器上安装了 [Node.js](https://nodejs.org/)。
2. **npm**：Node.js 安装时会默认包含 npm（Node 包管理器）。

## 安装与部署

### 1. 克隆仓库

首先，你需要克隆该项目到本地：

git clone https://github.com/cnkyuwd-1/fakegrok0.git
cd fakegrok0
2. 安装依赖
在项目目录下，执行以下命令来安装所需的依赖：

npm install
4. 启动服务器
完成上述步骤后，可以启动服务器：


node server.js

此时，服务器会在本地的 http://localhost:8080 上运行。
