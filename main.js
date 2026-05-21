(function () {
  "use strict";

  function createCard(item, extraClass = "") {
    const card = document.createElement("figure");
    card.className = `portfolio-card${extraClass ? ` ${extraClass}` : ""}`;
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.loading = "lazy";
    img.draggable = false;
    img.onerror = () => {
      if (img.dataset.fallback !== "1") {
        img.src = item.fallback;
        img.dataset.fallback = "1";
      }
    };
    card.appendChild(img);
    card.dataset.fullSrc = item.src;
    card.dataset.fallbackSrc = item.fallback;
    return card;
  }

  function renderTrack(track, items, cardClass = "") {
    if (!track) return;
    track.innerHTML = "";
    items.forEach((item) => {
      track.appendChild(createCard(item, cardClass));
      track.appendChild(createCard(item, cardClass));
    });
  }

  function initMarquee(wrap) {
    const track = wrap.querySelector(".marquee-track");
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let startOffset = 0;
    let currentOffset = 0;
    let dragMoved = false;
    let rafId = null;

    const getAnimOffset = () => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(track).transform);
      return matrix.m41;
    };

    const applyOffset = (px) => {
      track.style.transform = `translateX(${px}px)`;
    };

    const freezeToCurrent = () => {
      currentOffset = getAnimOffset();
      track.style.animation = "none";
      applyOffset(currentOffset);
    };

    const resumeAnimation = () => {
      if (isDragging) return;
      track.style.animation = "";
      track.style.transform = "";
      currentOffset = 0;
    };

    wrap.addEventListener("mouseenter", () => {
      wrap.classList.add("is-paused");
      freezeToCurrent();
    });

    wrap.addEventListener("mouseleave", () => {
      wrap.classList.remove("is-paused");
      if (!isDragging) resumeAnimation();
    });

    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      dragMoved = false;
      wrap.classList.add("is-dragging", "is-paused");
      freezeToCurrent();
      startX = e.clientX;
      startOffset = currentOffset;
      track.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) dragMoved = true;
      currentOffset = startOffset + dx;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => applyOffset(currentOffset));
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      wrap.classList.remove("is-dragging");
      if (!wrap.matches(":hover")) {
        wrap.classList.remove("is-paused");
        resumeAnimation();
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    track.addEventListener("click", (e) => {
      if (dragMoved) return;
      const card = e.target.closest(".portfolio-card");
      if (!card) return;
      const img = card.querySelector("img");
      const src =
        img?.dataset.fallback === "1"
          ? card.dataset.fallbackSrc
          : img?.currentSrc || img?.src || card.dataset.fullSrc;
      openLightbox(src, img?.alt || "");
    });
  }

  function initLightbox() {
    const lb = document.getElementById("lightbox");
    const lbImg = lb?.querySelector(".lightbox-img");
    const closeBtn = lb?.querySelector(".lightbox-close");
    if (!lb || !lbImg) return;

    const close = () => {
      lb.classList.remove("is-open");
      lb.setAttribute("hidden", "");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    window.openLightbox = (src, alt) => {
      lbImg.src = src;
      lbImg.alt = alt;
      lb.removeAttribute("hidden");
      lb.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => lb.classList.add("is-open"));
      document.body.style.overflow = "hidden";
    };

    closeBtn?.addEventListener("click", close);
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("is-open")) close();
    });
  }

  function initNavHighlight() {
    const sections = document.querySelectorAll("#view-home section[id], #view-home header[id]");
    const links = document.querySelectorAll("#nav-links-home a[href^='#']");
    if (!links.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((a) => {
            a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }

  const viewHome = document.getElementById("view-home");
  const viewProject = document.getElementById("view-project");
  const navHome = document.getElementById("nav-links-home");
  const navProject = document.getElementById("nav-links-project");
  const detailTrack = document.getElementById("detail-track");
  const detailMarquee = document.getElementById("detail-marquee");
  const marqueeInited = new WeakSet();

  function ensureMarquee(wrap) {
    if (!wrap || marqueeInited.has(wrap)) return;
    initMarquee(wrap);
    marqueeInited.add(wrap);
  }

  function showHome(scrollTo) {
    viewHome.classList.add("is-active");
    viewProject.classList.remove("is-active");
    navHome.hidden = false;
    navProject.hidden = true;
    document.title = "刘宇 · UI 设计师";
    if (scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function showProject(id) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;

    document.getElementById("detail-type").textContent = project.typeLabel;
    document.getElementById("detail-title").textContent = project.title;
    document.getElementById("detail-subtitle").textContent = project.subtitle;
    document.getElementById("detail-year").textContent = project.year;
    document.getElementById("detail-intro").textContent = project.intro;
    document.getElementById("detail-concept").textContent = project.concept;
    document.title = `${project.title} · UI 作品集`;

    const cardClass = project.type === "mobile" ? "portfolio-card--mobile" : "portfolio-card--desktop";
    detailTrack.className = "marquee-track" + (project.reverse ? " marquee-track--reverse" : "");
    renderTrack(detailTrack, getProjectImages(project), cardClass);
    ensureMarquee(detailMarquee);

    viewHome.classList.remove("is-active");
    viewProject.classList.add("is-active");
    navHome.hidden = true;
    navProject.hidden = false;
    window.scrollTo(0, 0);
    location.hash = project.slug;
  }

  function parseHash() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash || hash === "home") {
      showHome();
      return;
    }
    if (hash === "contact") {
      showHome("contact");
      return;
    }
    const project = PROJECTS.find((p) => p.slug === hash);
    if (project) showProject(project.id);
    else showHome();
  }

  function initHomePortfolio() {
    document.querySelectorAll("[data-project-preview]").forEach((wrap) => {
      const id = Number(wrap.dataset.projectPreview);
      const project = PROJECTS.find((p) => p.id === id);
      if (!project) return;
      const track = wrap.querySelector(".marquee-track");
      const cardClass = project.type === "mobile" ? "portfolio-card--mobile" : "portfolio-card--desktop";
      renderTrack(track, getProjectImages(project), cardClass);
      ensureMarquee(wrap);
    });
  }

  document.querySelectorAll("[data-open-project]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showProject(Number(el.dataset.openProject));
    });
  });

  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const action = el.dataset.action;
      if (action === "home") {
        e.preventDefault();
        history.pushState(null, "", "#");
        showHome();
      } else if (action === "contact") {
        e.preventDefault();
        history.pushState(null, "", "#contact");
        showHome("contact");
      }
    });
  });

  window.addEventListener("hashchange", parseHash);
  window.addEventListener("popstate", parseHash);

  document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    initNavHighlight();
    initHomePortfolio();
    parseHash();
  });
})();
