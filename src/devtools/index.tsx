console.log("devtools");

chrome.devtools.panels.create(
  "Hackathon",
  "vite.svg",
  "src/panel/index.html",
  (panel) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    console.log("panel", panel);
  }
);

export {};