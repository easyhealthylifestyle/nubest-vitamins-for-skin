/* Skin Vitamins, Food First: plate builder.
   Each food lists the vitamins (of the five covered) it is a
   recognized source of, per NIH Office of Dietary Supplements
   food-source lists. It shows presence only, not amounts. */

(function () {
  "use strict";

  var FOODS = [
    { name: "Orange", v: ["c"] },
    { name: "Red bell pepper", v: ["c", "a"] },
    { name: "Kiwi", v: ["c"] },
    { name: "Strawberries", v: ["c"] },
    { name: "Broccoli", v: ["c"] },
    { name: "Spinach", v: ["a", "c", "e"] },
    { name: "Carrots", v: ["a"] },
    { name: "Sweet potato", v: ["a"] },
    { name: "Almonds", v: ["e"] },
    { name: "Sunflower seeds", v: ["e"] },
    { name: "Peanuts", v: ["e", "b3"] },
    { name: "Salmon", v: ["d", "b3"] },
    { name: "Tuna", v: ["d", "b3"] },
    { name: "Eggs", v: ["a", "d"] },
    { name: "Fortified milk", v: ["a", "d"] },
    { name: "Chicken", v: ["b3"] },
    { name: "Brown rice", v: ["b3"] }
  ];

  var LABELS = { c: "C", e: "E", a: "A", d: "D", b3: "B3" };
  var ORDER = ["c", "e", "a", "d", "b3"];

  var foodsEl = document.getElementById("foods");
  var statusEl = document.getElementById("plate-status");
  var resetEl = document.getElementById("reset");
  if (!foodsEl) return;

  var selected = {};
  var buttons = [];

  function render() {
    var covered = {};
    FOODS.forEach(function (f, i) {
      if (selected[i]) f.v.forEach(function (v) { covered[v] = true; });
    });

    ORDER.forEach(function (v) {
      var seg = document.querySelector('.seg[data-v="' + v + '"]');
      if (seg) seg.classList.toggle("on", !!covered[v]);
    });

    var have = ORDER.filter(function (v) { return covered[v]; });
    var missing = ORDER.filter(function (v) { return !covered[v]; });
    var count = Object.keys(selected).filter(function (k) { return selected[k]; }).length;

    if (count === 0) {
      statusEl.textContent = "Your plate is empty.";
    } else if (missing.length === 0) {
      statusEl.textContent = "All five covered: C, E, A, D and B3.";
    } else {
      statusEl.textContent = "Covered: " + (have.length ? have.map(function (v) { return LABELS[v]; }).join(", ") : "none") +
        ". Still missing: " + missing.map(function (v) { return LABELS[v]; }).join(", ") + ".";
    }
  }

  FOODS.forEach(function (food, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = food.name;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () {
      selected[i] = !selected[i];
      b.setAttribute("aria-pressed", selected[i] ? "true" : "false");
      render();
    });
    foodsEl.appendChild(b);
    buttons.push(b);
  });

  if (resetEl) {
    resetEl.addEventListener("click", function () {
      selected = {};
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      render();
    });
  }

  render();
})();
