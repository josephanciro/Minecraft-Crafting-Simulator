// =============================
// ELEMENTS
// =============================

const items = document.querySelectorAll(".item");
const slots = document.querySelectorAll(".slot");

const result = document.getElementById("result");
const itemName = document.getElementById("itemName");
const craftBtn = document.getElementById("craftBtn");

// =============================
// CRAFTING DATA
// =============================

let crafting = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let draggedItem = "";
let draggedEmoji = "";

// =============================
// DRAG INVENTORY ITEMS
// =============================

items.forEach(item => {

    item.addEventListener("dragstart", () => {

        draggedItem = item.dataset.item;
        draggedEmoji = item.innerHTML;

    });

});

// =============================
// CRAFTING SLOTS
// =============================

slots.forEach(slot => {

    // Allow dropping
    slot.addEventListener("dragover", e => {

        e.preventDefault();

    });

    // Drop item
    slot.addEventListener("drop", e => {

        e.preventDefault();

        slot.innerHTML = draggedEmoji;
        slot.dataset.item = draggedItem;

        const index = Number(slot.dataset.index);

        crafting[index] = draggedItem;

        checkRecipe();

    });

    // Double click to remove item
    slot.addEventListener("dblclick", () => {

        slot.innerHTML = "";
        slot.dataset.item = "";

        crafting[slot.dataset.index] = "";

        checkRecipe();

    });

});

// =============================
// CHECK RECIPES
// =============================

function checkRecipe() {

    result.innerHTML = "";
    itemName.innerHTML = "Nothing Crafted";

    let found = false;

    recipes.forEach(recipe => {

        let match = true;

        for (let i = 0; i < 9; i++) {

            if (recipe.pattern[i] !== crafting[i]) {

                match = false;
                break;

            }

        }

        if (match && !found) {

            result.innerHTML = `<img src="${recipe.icon}" alt="${recipe.name}">`;
            itemName.innerHTML = recipe.name;

            found = true;

        }

    });

}

// =============================
// CRAFT BUTTON
// =============================

craftBtn.addEventListener("click", () => {

    if (result.innerHTML === "?")
        return;

    // Clear crafting array
    crafting = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    // Clear slots
    slots.forEach(slot => {

        slot.innerHTML = "";
        slot.dataset.item = "";

    });

    // Reset output
    checkRecipe();

});