(function () {
  "use strict";

  var panel = EasySignage.read();
  var tags = panel.tags || {};
  var data = window.MENU_DATA;

  // Applies the theme tag and the is-portrait class.
  EasySignageTheme.apply(panel);

  // Pick the menu named by the `menu` tag, or the first one.
  var keys = Object.keys(data.menus);
  var menu = data.menus[tags.menu] || data.menus[keys[0]];

  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text) e.textContent = text; // textContent, never innerHTML, for data
    return e;
  }

  function price(n) {
    return data.currency + (n % 1 === 0 ? String(n) : n.toFixed(2));
  }

  document.getElementById("menu-title").textContent = menu.title;

  var sectionsEl = document.getElementById("sections");
  for (var i = 0; i < menu.sections.length; i++) {
    var section = menu.sections[i];
    var col = el("section", "section");
    col.appendChild(el("h2", "", section.name));

    for (var j = 0; j < section.items.length; j++) {
      var item = section.items[j];
      var row = el("div", "item");
      var left = el("div", "item-left");
      var name = el("div", "item-name", item.name);
      if (item.tag) name.appendChild(el("span", "badge", item.tag));
      left.appendChild(name);
      if (item.note) left.appendChild(el("div", "item-note", item.note));
      row.appendChild(left);
      row.appendChild(el("div", "item-price", price(item.price)));
      col.appendChild(row);
    }
    sectionsEl.appendChild(col);
  }

  var special = document.getElementById("special");
  if (tags.special) special.textContent = tags.special;
  else special.style.display = "none";
})();
