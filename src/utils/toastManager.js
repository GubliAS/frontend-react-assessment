export function showToast({ id = Date.now(), title, description, timeout = 4000 }) {
  try {
    const detail = { id, title, description, timeout };
    window.dispatchEvent(new CustomEvent("srt:add-toast", { detail }));
  } catch (e) {
    // no-op in non-browser env
    // console.warn("showToast failed", e);
  }
}