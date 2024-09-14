document.addEventListener("DOMContentLoaded", (event) => {
  const menu = document.querySelector(".menu-icon");
  const mobileNav = document.querySelector(".mobile-nav");
  const loginsOverlay = document.querySelector(".logins-container");
  const loginsBtn = document.querySelector(".logins-button");
  const bottomNav = document.querySelector(".bottom-nav");

  function getMaxHeight() {
    const viewportHeight = window.innerHeight;
    const bottomNavHeight = bottomNav ? bottomNav.offsetHeight : 0;
    return viewportHeight - bottomNavHeight;
  }

  function setContainerHeight(container) {
    const maxHeight = getMaxHeight();
    const minHeight = 200;
    let idealHeight = maxHeight * 0.6;
    const clampedHeight = Math.max(minHeight, Math.min(idealHeight, maxHeight));
    container.style.height = `${clampedHeight}px`;
    container.style.maxHeight = `${maxHeight}px`;
  }

  function setMobileNavHeight() {
    setContainerHeight(mobileNav);
  }

  function setLoginsContainerHeight() {
    setContainerHeight(loginsOverlay);
  }

  setMobileNavHeight();
  setLoginsContainerHeight();

  window.addEventListener("resize", () => {
    setMobileNavHeight();
    setLoginsContainerHeight();
  });

  function toggleContainers(showContainer, hideContainer) {
    hideContainer.classList.remove(
      "active-mobile-nav",
      "active-logins-container"
    );
    showContainer.classList.add(
      showContainer === mobileNav
        ? "active-mobile-nav"
        : "active-logins-container"
    );
    setContainerHeight(showContainer);
  }

  menu.addEventListener("click", () => {
    if (loginsOverlay.classList.contains("active-logins-container")) {
      toggleContainers(mobileNav, loginsOverlay);
    } else {
      mobileNav.classList.toggle("active-mobile-nav");
      if (mobileNav.classList.contains("active-mobile-nav")) {
        setMobileNavHeight();
      }
    }
    if (bottomNav) {
      bottomNav.classList.toggle("bottom-nav-hidden");
    }
  });

  loginsBtn.addEventListener("click", () => {
    if (mobileNav.classList.contains("active-mobile-nav")) {
      toggleContainers(loginsOverlay, mobileNav);
    } else {
      loginsOverlay.classList.toggle("active-logins-container");
      if (loginsOverlay.classList.contains("active-logins-container")) {
        setLoginsContainerHeight();
      }
    }
  });

  let startY, startHeight;
  let isResizing = false; // Track if resizing is active

  function initResize(e, container) {
    e.preventDefault();
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight = parseInt(
      document.defaultView.getComputedStyle(container).height,
      10
    );
    isResizing = true; // Set resizing to true when the drag starts
    document.documentElement.addEventListener(
      "mousemove",
      (e) => handleResize(e, container),
      { passive: false }
    );
    document.documentElement.addEventListener("mouseup", stopResize, {
      passive: false,
    });
    document.documentElement.addEventListener(
      "touchmove",
      (e) => handleResize(e, container),
      { passive: false }
    );
    document.documentElement.addEventListener("touchend", stopResize, {
      passive: false,
    });
  }

  function handleResize(e, container) {
    if (!isResizing) return; // Prevent resizing when not intended
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const difference = startY - currentY;
    const maxHeight = getMaxHeight();
    const newHeight = Math.min(
      maxHeight,
      Math.max(200, startHeight + difference)
    );
    container.style.height = newHeight + "px";
  }

  function stopResize() {
    isResizing = false; // Stop resizing
    document.documentElement.removeEventListener("mousemove", handleResize);
    document.documentElement.removeEventListener("mouseup", stopResize);
    document.documentElement.removeEventListener("touchmove", handleResize);
    document.documentElement.removeEventListener("touchend", stopResize);
  }

  function addResizeHandle(container) {
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    container.prepend(resizeHandle);

    resizeHandle.addEventListener(
      "mousedown",
      (e) => initResize(e, container),
      { passive: false }
    );
    resizeHandle.addEventListener(
      "touchstart",
      (e) => initResize(e, container),
      { passive: false }
    );
  }

  addResizeHandle(mobileNav);
  addResizeHandle(loginsOverlay);
});
