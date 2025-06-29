import { Slider } from './classes/Slider.js';
import { CardList } from './classes/CardList.js';
import { FilterPanel } from './classes/FilterPanel.js';
import { HamburgerMenu } from './classes/HamburgerMenu.js';
import { FilterMenu } from './classes/FilterMenu.js';


const cardList = new CardList('./data/trips.json', '.galery__items');
document.addEventListener('DOMContentLoaded', async () => {
  const menu = new HamburgerMenu({
    hamburgerSelector: '.header-hamburger',
    navSelector: '.header__nav'
  });

  const filterMenu = new FilterMenu({
    filterButton: '.show-filters-button',
    filterContainer: '.galery__filter',
    closeButton: '.filter-popup-close-button'
  });

  menu.init();
  filterMenu.init();

  Slider.initAll();
  await cardList.init();
  const filterPanel = new FilterPanel(cardList);
});
