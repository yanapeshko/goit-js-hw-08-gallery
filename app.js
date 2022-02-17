import images from './galleryItems.js';

const galleryContainer = document.querySelector(".js-gallery");
const imagesMarkup = createGalleryItemsMarkup(images);
const lightBoxImage = document.querySelector(".js-lightbox");
const imageItem = document.querySelector(".lightbox__image");
const backdrop = document.querySelector(".lightbox__overlay");
const btnClose = document.querySelector('[data-action="close-lightbox"]');

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);
galleryContainer.addEventListener("click", onGalleryItemClick);
btnClose.addEventListener("click", onHandlerClose);
backdrop.addEventListener("click", onBackdropClick);
// - Создание и рендер разметки по массиву данных `galleryItems` из `app.js` и
//   предоставленному шаблону.
function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, description, original }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    })
    .join("");
}
// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
//   изображения.
function onGalleryItemClick(e) {
  e.preventDefault();
  const isGalleryImageEl = e.target.classList.contains("gallery__image");
  if (!isGalleryImageEl) {
    return;
  }
  // - Открытие модального окна по клику на элементе галереи.
  if (isGalleryImageEl) {
    window.addEventListener("keydown", onEscKeyPress);
    lightBoxImage.classList.add("is-open");

    // - Подмена значения атрибута `src` элемента `img.lightbox__image`.
    imageItem.src = e.target.getAttribute("data-source");
    imageItem.alt = e.target.alt;
  }
}

// - Закрытие модального окна по клику на кнопку
//   `button[data-action="close-lightbox"]`.
function onHandlerClose(e) {
  // e.preventDefault();
  window.removeEventListener("keydown", onEscKeyPress);
  lightBoxImage.classList.remove("is-open");
  // - Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо
  //   для того, чтобы при следующем открытии модального окна, пока грузится
  //   изображение, мы не видели предыдущее.
  imageItem.src = "";
  imageItem.alt = "";
}
// Закрытие модального окна по клику на `div.lightbox__overlay`
function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    onHandlerClose();
  }
}
// Закрытие модального окна по нажатию клавиши `ESC`
function onEscKeyPress(e) {
  console.log(e);
  const ESC_KEY_CODE = "Escape";
  if (e.code === ESC_KEY_CODE) {
    onHandlerClose();
  }
}
