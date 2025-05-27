const BASE_DOMAIN = "https://webetu.iutnc.univ-lorraine.fr";

export function displayGallery(gallery) {
  const c = document.getElementById("gallery-container");
  c.innerHTML = "";

  (gallery.photos || []).forEach(item => {
    const p = item.photo;
    const url = `${BASE_DOMAIN}/www/canals5/phox/img/small/${p.file}`;
    const img = document.createElement("img");
    img.src = url;
    img.alt = p.titre || '';
    img.className = "vignette";
    img.setAttribute("data-photoId", p.id);
    img.onclick = () => import('./index.js').then(m => m.getPicture(p.id));
    c.appendChild(img);
  });
}
