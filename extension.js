import images from './app.js';
const refs = {
  gallery: document.querySelector('.js-gallery'),
  image: document.createElement('img'),
  lightbox: document.querySelector('.lightbox'),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector('.lightbox__content'),
  lightbox__image: document.querySelector('.lightbox__image'),
};

const createGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
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
const galleryMarkup = images.reduce(
  (acc, item) => acc + createGalleryItem(item),
  ''
);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
refs.image.classList.add('gallery__image');

refs.gallery.addEventListener('click', onGalleryClick);
refs.btn.addEventListener('click', onClickHandlerClose);
refs.modal.addEventListener('click', closeLightbox);

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  if (e.target.nodeName === 'IMG') {
    refs.lightbox.classList.add('is-open');
    refs.lightbox__image.src = e.target.getAttribute('data-source');
    refs.lightbox__image.alt = e.target.alt;
  }
  window.addEventListener('keyup', clickKey);
}

function onClickHandlerClose(e) {
  e.preventDefault();
  refs.lightbox.classList.remove('is-open');
  refs.lightbox__image.src = '';
  refs.lightbox__image.alt = '';
  window.removeEventListener('keyup', clickKey);
}

function closeLightbox(e) {
  if (e.target === e.currentTarget) {
    onClickHandlerClose();
  }
}

function clickKey(e) {
  onClickHandlerClose();
}
