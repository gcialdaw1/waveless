export class CardList {

  originalData = [];

  constructor(jsonPath, containerSelector) {
    this.jsonPath = jsonPath;
    this.container = document.querySelector(containerSelector);
  }

  async init() {
    try {
      const data = await this.fetchData();
      this.originalData = data;
      const grouped = this.groupByContinent(data);
      this.render(grouped);
    } catch (error) {
      console.error('Error al inicializar CardList:', error);
    }
  }

  async fetchData() {
    const response = await fetch(this.jsonPath);
    if (!response.ok) throw new Error('No se pudo cargar el JSON');
    return await response.json();
  }


  groupByContinent(data) {
    return data.reduce((acc, viaje) => {
      if (!acc[viaje.continente]) acc[viaje.continente] = [];
      acc[viaje.continente].push(viaje);
      return acc;
    }, {});
  }

  render(groups) {
    this.container.innerHTML = "";
    for (const continente in groups) {
      const h3 = document.createElement('h3');
      h3.className = 'items__title';
      h3.textContent = continente;
      this.container.appendChild(h3);

      const fila = document.createElement('div');
      fila.className = 'items__row';

      groups[continente].forEach(viaje => {
        fila.appendChild(this.createCard(viaje));
      });

      this.container.appendChild(fila);
    }
    this.addBGImage();
    this.addCardEvents();
  }

  createCard(viaje) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'row__item';
    tarjeta.innerHTML = `
      <div class="item__image-wrapper" data-image="${viaje.imagePath}">
        <span class="image-wrapper__tag">${viaje.etiqueta}</span>
      </div>
      <div class="item__description">
        <div class="description__info">
          <p class="info__location">${viaje.pais}, <span class="info__duration">${viaje.duracion} días</span></p>
          <h4 class="info__title">${viaje.titulo}</h4>
        </div>
        <div class="description__pricing">
          <div class="pricing__info">
            <span class="info__from">Desde</span>
            <p class="info__price">${viaje.precio.toFixed(2)}€</p>
            <button value="${viaje.id}" class="show-info_button">Ver desglose</button>
          </div>
          <button class="pricing__cta pricing_button">
            Reservar
          </button>
        </div>
      </div>
    `;
    return tarjeta;
  }

  addBGImage() {
    document.querySelectorAll('.item__image-wrapper').forEach(el => {
      const imageUrl = el.dataset.image;
      el.style.backgroundImage = `url('${imageUrl}')`;
    });
  }

  addCardEvents() {
    const buttons = document.querySelectorAll('.show-info_button');

    buttons.forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();

        this.togglePopup(event.currentTarget, this.retrieveItemData(event.srcElement.value));
      });
    });

    // Cierra el popup si haces clic fuera
    document.addEventListener('click', () => this.removePopup());
  }

  togglePopup(button, item) {
    console.log(item);

    // Cierra si ya existe
    this.removePopup();
    const popup = document.createElement('div');
    popup.classList.add('popup-desglose');
    popup.innerHTML = `<div class="popup-desglose__header">
          <p class="header__title">Desglose de precios</p>
          <button class="header__button popup-close-button"></button>
        </div>
        <div class="popup-desglose__content">
          <p class="content__location">${item.pais}, ${item.continente} <span class="content__duration">${item.duracion} días</span></p>
          <ul class="content__list">
            <li class="list__item"><p class="item__text">Precio antes de impuestos</p> <span class="item__price">${(item.precio * 0.79).toFixed(2)}€</span></li>
            <li class="list__item"><p class="item__text">Impuesto</p> <span class="item__price">${(item.precio * 0.21).toFixed(2)}€</span></li>
            <li class="list__item"><p class="item__text">Lorem ipsum</p> <span class="item__price">150,52€</span></li>
          </ul>
        </div>
        <div class="popup-desglose__final">
          <span class="final__text">Precio final</span>
          <span class="final__price">${item.precio}€</span>
        </div>`;
    document.body.appendChild(popup);

    const closeButton = document.querySelector('.popup-close-button');
    closeButton.addEventListener('click', () => this.removePopup());

    const rect = button.getBoundingClientRect();
    popup.style.position = 'absolute';
    if (window.screen.width > 500) {
      popup.style.left = `${rect.left + window.scrollX}px`;
      popup.style.top = `${rect.bottom + window.scrollY + 8}px`;
    }


    // Detener propagación para que no se cierre al hacer clic dentro
    popup.addEventListener('click', (e) => e.stopPropagation());
  }

  removePopup() {
    const existing = document.querySelector('.popup-desglose');
    if (existing) existing.remove();
  }

  retrieveItemData(id) {
    return this.originalData.filter(item => {
      const idMatch = item.id == id;
      return idMatch;
    })[0];
  }
}