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


  function setMobileNavHeight() {
    const maxHeight = getMaxHeight();

    const minHeight = 200;

    let idealHeight = maxHeight * 0.6;

    const clampedHeight = Math.max(minHeight, Math.min(idealHeight, maxHeight));

    mobileNav.style.height = `${clampedHeight}px`;
    mobileNav.style.maxHeight = `${maxHeight}px`;
  }

  setMobileNavHeight();

  window.addEventListener("resize", setMobileNavHeight);

  menu.addEventListener("click", () => {
    mobileNav.classList.toggle("active-mobile-nav");
    if (bottomNav) {
      bottomNav.classList.toggle("bottom-nav-hidden");
    }

    if (mobileNav.classList.contains("active-mobile-nav")) {
      setMobileNavHeight();
    }
  });

  loginsBtn.addEventListener("click", () => {
    loginsOverlay.classList.toggle("active-logins-container");
    console.log("Clicked");
  });

  let startY, startHeight;

  function initResize(e) {
    e.preventDefault();
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight = parseInt(
      document.defaultView.getComputedStyle(mobileNav).height,
      10
    );
    document.documentElement.addEventListener("mousemove", resize, false);
    document.documentElement.addEventListener("mouseup", stopResize, false);
    document.documentElement.addEventListener("touchmove", resize, false);
    document.documentElement.addEventListener("touchend", stopResize, false);
  }

  function resize(e) {
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const difference = startY - currentY;
    const maxHeight = getMaxHeight();
    const newHeight = Math.min(
      maxHeight,
      Math.max(200, startHeight + difference)
    );
    mobileNav.style.height = newHeight + "px";
  }

  function stopResize() {
    document.documentElement.removeEventListener("mousemove", resize, false);
    document.documentElement.removeEventListener("mouseup", stopResize, false);
    document.documentElement.removeEventListener("touchmove", resize, false);
    document.documentElement.removeEventListener("touchend", stopResize, false);
  }

  const resizeHandle = document.createElement("div");
  resizeHandle.className = "resize-handle";
  mobileNav.prepend(resizeHandle);

  resizeHandle.addEventListener("mousedown", initResize, false);
  resizeHandle.addEventListener("touchstart", initResize, false);
});
