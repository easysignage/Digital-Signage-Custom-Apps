(function () {
  "use strict";

  // One entry per zone. Images are bundled in the zip (relative paths only).
  var PROMOS = {
    north: {
      image: "images/north.svg",
      headline: "Winter Sale",
      detail: "30% off all jackets, North entrance"
    },
    south: {
      image: "images/south.svg",
      headline: "Fresh Today",
      detail: "Bakery specials until noon"
    },
    east: {
      image: "images/east.svg",
      headline: "Click & Collect",
      detail: "Pick up your online order at Desk 4"
    },
    "default": {
      image: "images/default.svg",
      headline: "Welcome",
      detail: "Ask our team for today's offers"
    }
  };

  var panel = EasySignage.read();
  var zone = (panel.tags && panel.tags.zone) || "";
  // Tag values are case-sensitive; normalise so "North" also matches.
  var promo = PROMOS[zone.toLowerCase()] || PROMOS["default"];

  document.getElementById("image").src = promo.image;
  document.getElementById("headline").textContent = promo.headline;
  document.getElementById("detail").textContent = promo.detail;

  // Prefer the reported resolution; fall back to the window size.
  var res = (panel.resolution || "").split("x");
  var w = parseInt(res[0], 10) || window.innerWidth;
  var h = parseInt(res[1], 10) || window.innerHeight;
  if (h > w) document.body.className = "portrait";
})();
