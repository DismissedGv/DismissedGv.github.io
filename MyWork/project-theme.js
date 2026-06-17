(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector("span");
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredTheme() {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      return;
    }
  }

  function setTheme(theme, shouldSave = false) {
    root.dataset.theme = theme;

    if (themeToggle && themeIcon) {
      themeIcon.textContent = theme === "dark" ? "\u2600" : "\u263e";
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      themeToggle.setAttribute("aria-pressed", theme === "dark");
    }

    if (shouldSave) {
      saveTheme(theme);
    }
  }

  const storedTheme = getStoredTheme();
  const initialTheme = storedTheme || (systemThemeQuery.matches ? "dark" : "light");
  setTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme, true);
  });

  const handleSystemThemeChange = event => {
    if (!getStoredTheme()) {
      setTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof systemThemeQuery.addEventListener === "function") {
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemThemeQuery.addListener === "function") {
    systemThemeQuery.addListener(handleSystemThemeChange);
  }
})();
