const KEY = "grouprandom_history_v1";
const THEME_KEY = "grouprandom_theme";

export function loadHistory() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function saveHistory(item) {
  const next = [item, ...loadHistory()].slice(0, 30);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function deleteHistory(id) {
  const next = loadHistory().filter(item => item.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
  return [];
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "dark";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}