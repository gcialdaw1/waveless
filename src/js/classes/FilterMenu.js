export class FilterMenu {
    constructor({ filterButton, filterContainer, closeButton }) {
        this.button = document.querySelector(filterButton);
        this.filterContainer = document.querySelector(filterContainer);
        this.closeButton = document.querySelector(closeButton);
    }

    init() {
        if (!this.button || !this.filterContainer || !this.closeButton) return;
        this.button.addEventListener('click', () => {
            this.filterContainer.classList.toggle('galery__filter--open');
        });

        this.closeButton.addEventListener('click', () => {
            this.filterContainer.classList.toggle('galery__filter--open');
        });
    }
}