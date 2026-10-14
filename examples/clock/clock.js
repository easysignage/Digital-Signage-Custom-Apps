(function () {
  "use strict";

  var panel = EasySignage.read();
  var tags = panel.tags || {};
  var use12h = tags.clock_format === "12";

  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  var timeEl = document.getElementById("time");
  var ampmEl = document.getElementById("ampm");
  var dateEl = document.getElementById("date");

  document.getElementById("greeting").textContent = tags.greeting || "";
  if (tags.accent) timeEl.style.color = tags.accent;
  if (window.innerHeight > window.innerWidth) document.body.className = "portrait";

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  // Uses the device's local time. Format by hand rather than with Intl, which
  // is incomplete on some older signage webviews.
  function tick() {
    var now = new Date();
    var h = now.getHours();
    var suffix = "";
    if (use12h) {
      suffix = h < 12 ? "AM" : "PM";
      h = h % 12 || 12;
    }
    timeEl.textContent = (use12h ? h : pad(h)) + ":" + pad(now.getMinutes());
    ampmEl.textContent = suffix;
    dateEl.textContent = DAYS[now.getDay()] + ", " + now.getDate() + " " +
      MONTHS[now.getMonth()] + " " + now.getFullYear();
  }

  tick();
  setInterval(tick, 1000);
})();
