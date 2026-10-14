/* Your app code. Keep it ES5-friendly (var, function, no arrow functions or
   template literals) so it runs on older Tizen, webOS and BrightSign players. */
(function () {
  "use strict";

  // Everything EasySignage tells you about this screen. All values are strings.
  var panel = EasySignage.read();
  var tags = panel.tags || {};

  var name = panel.name || "this screen";
  var zone = tags.zone || "";

  document.getElementById("title").textContent = "Hello, " + name;
  document.getElementById("subtitle").textContent = zone
    ? "Zone: " + zone
    : "Add a 'zone' tag to this player to personalise this text.";

  // Portrait screens get a class you can style in style.css.
  var res = (panel.resolution || "").split("x");
  var w = parseInt(res[0], 10) || window.innerWidth;
  var h = parseInt(res[1], 10) || window.innerHeight;
  if (h > w) document.body.className += " portrait";
})();
