/**
 * 作品集配置 · 刘宇 UI 设计师
 */
const PROJECTS = [
  {
    id: 1,
    slug: "project-1",
    title: "粉鱼星球",
    subtitle: "移动端 · AI 粉丝互动社区",
    type: "mobile",
    typeLabel: "手机 App",
    year: "2025.12",
    intro: "粉鱼星球以艺人 AI 分身为核心的粉丝互动社区，通过 AI 对话满足情感陪伴与粉丝经济需求，打造沉浸式追星体验。",
    concept: "以「兴趣驱动 + 情感连接」为核心，通过轻量化互动与沉浸式内容构建高粘性的粉丝社交场景，让用户在参与、表达与共创中获得归属感与价值感。",
    colors: ["#e0f7fa", "#5c5c6e", "#6d28ff"],
    reverse: false,
    images: [
      "assets/project-1/01.png",
      "assets/project-1/02.png",
      "assets/project-1/03.png",
      "assets/project-1/04.png",
      "assets/project-1/05.png",
      "assets/project-1/06.png",
      "assets/project-1/07.png",
      "assets/project-1/08.png",
      "assets/project-1/09.png",
    ],
  },
  {
    id: 2,
    slug: "project-2",
    title: "妙啊",
    subtitle: "电脑端 · AI 短视频工具",
    type: "desktop",
    typeLabel: "电脑端",
    year: "2025.9",
    intro: "面向品牌方与创作者的 AI 短视频营销工具，可快速完成视频创意、脚本、素材生成，提升内容产出效率。平台整合案例分析、AI 分镜、视频合成等功能，高效产出可投放营销视频，兼顾生产效率与内容质量。",
    concept: "以「AI 能力可视化」为核心，通过清晰的信息架构与模块化交互设计，降低复杂技术的理解与使用门槛，让专业能力高效赋能业务决策。",
    colors: ["#e8f4fc", "#3d3d48", "#2563eb"],
    reverse: true,
    images: [
      "assets/project-2/01.png",
      "assets/project-2/02.png",
      "assets/project-2/03.png",
      "assets/project-2/04.png",
      "assets/project-2/05.png",
      "assets/project-2/06.png",
      "assets/project-2/07.png",
      "assets/project-2/08.png",
      "assets/project-2/09.png",
    ],
  },
  {
    id: 3,
    slug: "project-3",
    title: "Deep Miner-Dev",
    subtitle: "B 端 · AI 智能体后台管理系统",
    type: "desktop",
    typeLabel: "电脑端",
    year: "2026.1",
    intro: "AI agent 管理与调度系统，可通过 agent 调用工具完成复杂任务。针对其数据获取、工具建构效率不足的问题，通过管理平台对 agent 及工具能力进行统一管理与优化。",
    concept: "以「高效构建 × 精准管控」为核心，通过结构化信息架构与流程驱动型设计，打造面向专业人员的智能体开发与管理平台，实现能力沉淀与业务闭环。",
    colors: ["#f5f6fa", "#3d3d48", "#6d28ff"],
    reverse: false,
    images: [
      "assets/project-3/01.png",
      "assets/project-3/02.png",
      "assets/project-3/03.png",
      "assets/project-3/04.png",
      "assets/project-3/05.png",
      "assets/project-3/06.png",
      "assets/project-3/07.png",
      "assets/project-3/08.png",
      "assets/project-3/09.png",
      "assets/project-3/10.png",
    ],
  },
];

function buildPlaceholder(project, index) {
  const [c1, c2, c3] = project.colors;
  const isMobile = project.type === "mobile";
  const w = isMobile ? 390 : 960;
  const h = isMobile ? 844 : 600;
  const num = String(index).padStart(2, "0");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <text x="${w / 2}" y="${h / 2 - 12}" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-family="PingFang SC,sans-serif" font-size="${isMobile ? 18 : 24}" font-weight="600">${project.title}</text>
    <text x="${w / 2}" y="${h / 2 + 22}" text-anchor="middle" fill="rgba(255,255,255,0.45)" font-family="PingFang SC,sans-serif" font-size="13" font-weight="300">${num} · 可替换为真实图片</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function getProjectImages(project) {
  if (project.images && project.images.length) {
    const seen = {};
    const list = [];
    project.images.forEach((src) => {
      if (seen[src]) return;
      seen[src] = true;
      const fb = buildPlaceholder(project, list.length + 1);
      list.push({ src, alt: `${project.title} 作品 ${list.length + 1}`, fallback: fb });
    });
    return list;
  }
  return Array.from({ length: 10 }, (_, i) => {
    const fb = buildPlaceholder(project, i + 1);
    return { src: fb, alt: `${project.title} 作品 ${i + 1}`, fallback: fb };
  });
}
