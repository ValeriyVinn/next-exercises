const isLocalhost =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

const headerEl = document.getElementById("header-message");

headerEl.textContent = isLocalhost
  ? "Navigation is worked"
  : "I'm sorry, menu links are navigated only locally";
