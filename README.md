# URL查询工具 (URL Query Tool)

一个简单而强大的浏览器扩展，帮助开发者和网站管理员分析、编辑和构建URL。

![Version](https://img.shields.io/badge/版本-0.0.0-blue)
![License](https://img.shields.io/badge/许可证-MIT-green)

## 📑 功能特点

- 🔍 解析并显示URL的各个组成部分
- ✏️ 编辑、添加或删除URL参数
- 📋 以多种格式复制URL和参数（完整URL、查询部分、JSON格式、列表格式）
- 🖥️ 支持弹出窗口和侧边栏两种使用模式
- 🔄 右键菜单快速访问工具
- 🌐 查看网站基本信息（域名、协议、路径）

## 🛠️ 技术栈

- [WXT](https://wxt.dev/) - 现代化的浏览器扩展开发框架
- [React 19](https://react.dev/) - 用户界面库
- [Semi Design](https://semi.design/) - 高质量的UI组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架

## 📦 安装与使用

### 开发模式

```bash
# 安装依赖
pnpm install

# 开发模式（Chrome）
pnpm dev

# 开发模式（Firefox）
pnpm dev:firefox
```

### 构建扩展

```bash
# 构建扩展（Chrome）
pnpm build

# 构建扩展（Firefox）
pnpm build:firefox

# 打包为zip文件（Chrome）
pnpm zip

# 打包为zip文件（Firefox）
pnpm zip:firefox
```

## 🤝 贡献指南

欢迎提交问题和功能请求。如果您想要贡献代码，请先创建issue讨论您的想法。

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。
