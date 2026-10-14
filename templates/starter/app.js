/* Your app code. Keep it ES5-friendly (var, function, no arrow functions or
   template literals) so it runs on older Tizen, webOS and BrightSign players. */
(function () {
  "use strict";

  // Everything EasySignage tells you about this screen. All values are strings.
  var panel = EasySignage.read();
  var tags = panel.tags || {};

  // Applies the `theme` (dark, light, contrast) and `accent` tags, and adds
  // an is-portrait / is-landscape class to <html>.
  EasySignageTheme.apply(panel);

  var name = panel.name || "this screen";
  var zone = tags.zone || "";

  document.getElementById("title").textContent = "Hello, " + name;
  document.getElementById("subtitle").textContent = zone
    ? "Zone: " + zone
    : "Add a 'zone' tag to this player to personalise this text.";
})();
