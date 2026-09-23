(() => {
  const toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;

  const preferenceKey = 'sebass-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  // Storage can be unavailable in restricted browsers or for local files.
  try {
    savedTheme = localStorage.getItem(preferenceKey);
  } catch {
    // The toggle still works for this page visit.
  }

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    toggle.setAttribute('aria-pressed', String(isDark));
  };
  const hasPreference = () => savedTheme === 'dark' || savedTheme === 'light';
  applyTheme(hasPreference() ? savedTheme === 'dark' : systemTheme.matches);

  toggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    savedTheme = isDark ? 'dark' : 'light';
    try {
      localStorage.setItem(preferenceKey, savedTheme);
    } catch {
      // Retain the in-memory preference for this visit.
    }
  });
  systemTheme.addEventListener('change', (event) => {
    if (!hasPreference()) applyTheme(event.matches);
  });
})();
