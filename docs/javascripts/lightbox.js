(function () {
  let overlay = null;
  let overlayImg = null;
  let overlayCaption = null;

  function isEnglishPage() {
    const lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return lang.startsWith("en") || window.location.pathname.includes("/en/");
  }

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "guide-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "guide-lightbox__close";
    closeBtn.setAttribute("aria-label", isEnglishPage() ? "Close" : "閉じる");
    closeBtn.textContent = "×";

    overlayImg = document.createElement("img");
    overlayImg.className = "guide-lightbox__img";
    overlayImg.alt = "";

    overlayCaption = document.createElement("div");
    overlayCaption.className = "guide-lightbox__caption";

    overlay.appendChild(closeBtn);
    overlay.appendChild(overlayImg);
    overlay.appendChild(overlayCaption);
    document.body.appendChild(overlay);

    const close = () => {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target === overlayImg) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }

  function openLightbox(img) {
    ensureOverlay();
    overlayImg.src = img.currentSrc || img.src;
    overlayImg.alt = img.alt || "";
    overlayCaption.textContent = img.alt || "";
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function enhanceScreenshots() {
    const hintText = isEnglishPage() ? "Tap to enlarge" : "タップで拡大";
    const imgs = document.querySelectorAll(".md-typeset img");

    imgs.forEach((img) => {
      if (img.dataset.lightboxBound === "1") return;
      if (img.classList.contains("no-lightbox")) return;
      const src = img.getAttribute("src") || "";
      if (!src.includes("assets/images/")) return;

      img.dataset.lightboxBound = "1";
      img.classList.add("screenshot-thumb");

      const parent = img.parentElement;
      if (parent && parent.tagName === "P" && parent.childNodes.length === 1) {
        const figure = document.createElement("figure");
        figure.className = "screenshot-figure";
        const hint = document.createElement("figcaption");
        hint.className = "screenshot-hint";
        hint.textContent = hintText;
        parent.replaceWith(figure);
        figure.appendChild(img);
        figure.appendChild(hint);
      }

      img.addEventListener("click", () => openLightbox(img));
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(enhanceScreenshots);
  } else {
    document.addEventListener("DOMContentLoaded", enhanceScreenshots);
  }
})();
