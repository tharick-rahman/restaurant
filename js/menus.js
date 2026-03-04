const categoryTabs = document.querySelectorAll(".sr-menu-category-tab");
const categoryPanels = document.querySelectorAll(".sr-menu-category-panel");

categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.getAttribute("data-category");
    if (!category) return;

    categoryTabs.forEach((t) => t.classList.remove("sr-menu-category-tab-active"));
    tab.classList.add("sr-menu-category-tab-active");

    categoryPanels.forEach((panel) => {
      if (panel.getAttribute("data-category-panel") === category) {
        panel.classList.add("sr-menu-category-panel-active");
      } else {
        panel.classList.remove("sr-menu-category-panel-active");
      }
    });
  });
});

