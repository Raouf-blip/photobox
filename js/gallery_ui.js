import { openLightbox } from './index.js';

export function displayGallery(gallery) {
  const c = document.getElementById("gallery-container");
  c.innerHTML = "";
  const ids = (gallery.photos || []).map(item => item.photo.id);

  (gallery.photos || []).forEach((item, idx) => {
    const p = item.photo;
    const url = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/img/small/" + p.file;
    const img = document.createElement("img");
    img.src = url;
    img.alt = p.titre || '';
    img.className = "vignette";
    img.setAttribute("data-photoId", p.id);
    img.onclick = () => openLightbox(p.id, ids, idx);
    c.appendChild(img);
  });
}
