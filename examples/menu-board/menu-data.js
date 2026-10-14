/* Menu content. Edit freely: add menus, sections and items.
   Each menu key (breakfast, lunch, ...) can be chosen per screen with the
   player tag `menu`, e.g. menu:lunch. */
window.MENU_DATA = {
  currency: "$",
  menus: {
    breakfast: {
      title: "Breakfast",
      sections: [
        {
          name: "Coffee",
          items: [
            { name: "Espresso", price: 3.5 },
            { name: "Flat White", price: 4.5 },
            { name: "Cappuccino", price: 4.5 },
            { name: "Iced Latte", price: 5.5, tag: "New" }
          ]
        },
        {
          name: "Food",
          items: [
            { name: "Avocado Toast", price: 14, note: "Sourdough, feta, chilli" },
            { name: "Granola Bowl", price: 11, note: "Yoghurt, berries, honey" },
            { name: "Bacon & Egg Roll", price: 10 }
          ]
        }
      ]
    },
    lunch: {
      title: "Lunch",
      sections: [
        {
          name: "Mains",
          items: [
            { name: "Chicken Burger", price: 18, note: "Slaw, pickles, aioli" },
            { name: "Falafel Wrap", price: 16, note: "Hummus, tabouli", tag: "Vegan" },
            { name: "Caesar Salad", price: 15 }
          ]
        },
        {
          name: "Drinks",
          items: [
            { name: "Fresh Juice", price: 7 },
            { name: "Sparkling Water", price: 4 },
            { name: "Iced Tea", price: 5 }
          ]
        }
      ]
    }
  }
};
