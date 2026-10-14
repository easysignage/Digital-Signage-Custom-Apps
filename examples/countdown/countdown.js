(function () {
  "use strict";

  var panel = EasySignage.read();
  var tags = panel.tags || {};

  // Parse "YYYY-MM-DDTHH:MM" by hand as local time. Date.parse of strings
  // without a timezone behaves differently across older webviews.
  function parseLocal(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/.exec(s || "");
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0));
  }

  var target = parseLocal(tags.event_date);
  var eventEl = document.getElementById("event");
  var unitsEl = document.getElementById("units");
  var doneEl = document.getElementById("done");

  eventEl.textContent = tags.event_name || "Coming soon";

  if (!target) {
    unitsEl.style.display = "none";
    doneEl.textContent = "Set the event_date tag on this player, e.g. 2026-12-01T09:00";
    return;
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  var timer;
  function tick() {
    var left = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
    document.getElementById("d").textContent = Math.floor(left / 86400);
    document.getElementById("h").textContent = pad(Math.floor(left / 3600) % 24);
    document.getElementById("m").textContent = pad(Math.floor(left / 60) % 60);
    document.getElementById("s").textContent = pad(left % 60);
    if (left === 0) {
      unitsEl.style.display = "none";
      doneEl.textContent = tags.done_text || "It's here!";
      clearInterval(timer);
    }
  }

  tick();
  timer = setInterval(tick, 1000);
})();
