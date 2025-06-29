export class FilterPanel {
  constructor(cardListInstance) {
    this.cardList = cardListInstance;
    this.filterElement = document.querySelector('.galery__filter');
    this.checkboxes = this.filterElement.querySelectorAll('input[type="checkbox"]');
    this.minPriceInput = this.filterElement.querySelector('input[placeholder="Mínimo"]');
    this.maxPriceInput = this.filterElement.querySelector('input[placeholder="Máximo"]');

    this.init();
  }

  init() {
    this.attachAccordionHandlers();
    this.addEventListeners();
  }

  attachAccordionHandlers() {
    this.filterElement.querySelectorAll(".filter-section__item-header").forEach(header => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const expanded = header.getAttribute("aria-expanded") === "true";
        header.setAttribute("aria-expanded", String(!expanded));
        content.classList.toggle("hidden");
      });
    });
  }

  addEventListeners() {
    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.applyFilters());
    });

    this.minPriceInput.addEventListener('input', () => this.applyFilters());
    this.maxPriceInput.addEventListener('input', () => this.applyFilters());
  }

  applyFilters() {
    const activeCategories = Array.from(this.checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.name.toLowerCase());

    const minPrice = parseFloat(this.minPriceInput.value) || 0;
    const maxPrice = parseFloat(this.maxPriceInput.value) || Infinity;    

    const filteredItems = this.cardList.originalData.filter(item => {
      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(item.etiqueta.toLowerCase());
      const priceMatch = item.precio >= minPrice && item.precio <= maxPrice;
      return categoryMatch && priceMatch;
    });

    const grouped = this.cardList.groupByContinent(filteredItems);
    this.cardList.render(grouped);
  }


}
