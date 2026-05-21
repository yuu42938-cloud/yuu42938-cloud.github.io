# 刘宇 · UI 设计师作品集

黑白灰极简 + 蓝紫点缀，苹方字体，中文单页作品集网站。

## 项目结构

```
vibe/
├── index.html              # 主站（推荐，引用外部 CSS/JS）
├── index-standalone.html   # 单文件版（CSS+JS 内联，可双击独立打开）
├── css/
│   └── style.css           # 全部样式
├── js/
│   ├── projects-data.js    # 项目配置与图片路径
│   └── main.js             # 滚动画廊、灯箱、路由
├── assets/
│   ├── wechat-qr.png       # 微信二维码
│   ├── project-1/          # 粉鱼星球 01~09.png
│   ├── project-2/          # 妙啊 01~09.png
│   └── project-3/          # Deep Miner-Dev 01~10.png
├── liuyu-portfolio.zip       # 打包下载（含图片）
└── README.md
```

## 本地预览

```bash
cd vibe
python -m http.server 8080
```

浏览器打开：`http://localhost:8080/index.html`

或用 VS Code **Live Server** 打开 `index.html`。

> 必须用本地服务器，不能直接双击 `index.html`（多文件版需加载 css/js/assets）。

单文件版可双击：`index-standalone.html`

## 图片路径一览

| 路径 | 说明 |
|------|------|
| `assets/wechat-qr.png` | 微信二维码 |
| `assets/project-1/01.png` ~ `09.png` | 粉鱼星球（9 张） |
| `assets/project-2/01.png` ~ `09.png` | 妙啊（9 张） |
| `assets/project-3/01.png` ~ `10.png` | Deep Miner-Dev（10 张） |

修改图片：替换对应文件并保持文件名，或在 `js/projects-data.js` 的 `images` 数组中改路径。

## 修改文案

- 个人信息：`index.html` 关于/联系区块
- 项目信息：`js/projects-data.js` 中 `PROJECTS` 数组

## 交互功能

- 作品集自动横向滚动（无缝循环）
- 鼠标悬停暂停
- 拖拽手动滚动
- 点击放大预览（Esc 关闭）
- 项目详情页内切换（`#project-1` / `#project-2` / `#project-3`）

## 三个项目

1. **粉鱼星球** — 移动端 · AI 粉丝互动社区 · 2025.12  
2. **妙啊** — 电脑端 · AI 短视频工具 · 2025.9  
3. **Deep Miner-Dev** — B 端 · AI 智能体后台 · 2026.1  
