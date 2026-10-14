/* ============================================================================
   demo.js  —  On-screen debug view for this sample  (IGNORE THIS FILE)
   ============================================================================
   This is throwaway UI: it just renders every delivered field on the page so
   you can eyeball your integration. None of it belongs in a real creative.
   The only line that matters for integration is the first one below.
   ============================================================================ */
(function () {
  "use strict";

  // ---- This is the entire integration. Everything else is display code. ----
  var panel = EasySignage.read();
  var usingGlobal = EasySignage.usedGlobal();
  // ---------------------------------------------------------------------------

  // Canonical field list, in delivery order. EasySignage delivers only the
  // BroadSign-compatible subset: native keys plus BroadSign aliases pointing at
  // the same values (display_unit_*, frame_resolution, campaign_id), so creatives
  // written for either platform work. `tags` is shown separately below.
  var FIELDS = [
    "player_id", "name", "screen_id", "display_unit_id",
    "resolution", "display_unit_resolution", "frame_resolution",
    "display_unit_lat_long",
    "playlist_id", "campaign_id",
  ];
  // The fields most people check first, surfaced as cards.
  var CORE = [
    "player_id", "name", "screen_id", "display_unit_id",
    "resolution", "playlist_id", "campaign_id", "display_unit_lat_long",
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function renderValue(v) {
    if (v === undefined || v === "") return '<span class="empty">(empty)</span>';
    return esc(v);
  }

  // Mode banner: tells you which channel is live.
  var mode = document.getElementById("mode");
  mode.className = "banner " + (usingGlobal ? "ok" : "warn");
  mode.innerHTML = usingGlobal
    ? "<b>Normal mode.</b> Reading the injected global <code>window.easysignage</code>."
    : "<b>Degraded mode.</b> The injected global was not found — reading the URL query string directly. Your creative still works.";

  // Core cards
  document.getElementById("core").innerHTML = CORE.map(function (k) {
    var v = panel[k];
    var empty = v === undefined || v === "";
    return '<div class="card"><div class="k">' + esc(k) + '</div>' +
      '<div class="v' + (empty ? " empty" : "") + '">' + renderValue(v) + "</div></div>";
  }).join("");

  // Tags
  var tagsEl = document.getElementById("tags");
  var tags = panel.tags || {};
  var tagKeys = Object.keys(tags);
  if (tagKeys.length === 0) {
    tagsEl.innerHTML = '<span class="muted">No tags delivered.</span>';
  } else {
    tagsEl.innerHTML = tagKeys.map(function (k) {
      return '<span class="tag"><span class="tk">' + esc(k) + "</span>: " + esc(tags[k]) + "</span>";
    }).join("");
  }

  // Full field list — compact cards so most fields fit on one signage screen.
  function fieldCard(k, v) {
    var empty = v === undefined || v === "";
    return '<div class="card"><div class="k">' + esc(k) + '</div>' +
      '<div class="v' + (empty ? " empty" : "") + '">' + renderValue(v) + "</div></div>";
  }
  document.getElementById("fields").innerHTML = FIELDS.map(function (k) {
    return fieldCard(k, panel[k]);
  }).join("") +
  // Show tags.all too, if present.
  (tagKeys.length
    ? fieldCard("tags.all", tagKeys.map(function (k) { return k + ":" + tags[k]; }).join(","))
    : "");

  // Raw dumps
  document.getElementById("raw-global").textContent =
    window.easysignage ? JSON.stringify(window.easysignage, null, 2) : "window.easysignage is not defined (degraded mode).";
  document.getElementById("raw-query").textContent = location.search || "(no query string)";
})();
