import { firstGallery, lastGallery, loadGallery, nextGallery, prevGallery } from "./gallery.js";
import { displayGallery } from "./gallery_ui.js";
import { loadPicture, loadResource } from "./photoloader.js";

function initGallery() {
  loadGallery().then(displayGallery);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("load-gallery").onclick = initGallery;
  document.getElementById("gallery-next").onclick = () => nextGallery().then(displayGallery);
  document.getElementById("gallery-prev").onclick = () => prevGallery().then(displayGallery);
  document.getElementById("gallery-first").onclick = () => firstGallery().then(displayGallery);
  document.getElementById("gallery-last").onclick = () => lastGallery().then(displayGallery);


  initGallery();
})

let currentIndex = 0;
let galleryIds = [];

export function openLightbox(id, idsArray = [], index = 0) {
  currentIndex = index;
  galleryIds = idsArray;

  document.querySelector("main").style.display = "none";
  const lb = document.getElementById("lightbox");
  lb.style.display = "flex";
  lb.classList.add("active");
  showInLightbox(id);
}

function showInLightbox(id) {
  loadPicture(id).then(photoData => {
    const photo = photoData.photo;
    const url = photo.url.href.startsWith('http') ? photo.url.href : "https://webetu.iutnc.univ-lorraine.fr" + photo.url.href;

    const catPromise = loadResource(photoData.links.categorie.href);
    const comPromise = loadResource(photoData.links.comments.href);

    Promise.all([catPromise, comPromise]).then(([cat, coms]) => {
      const catName =
        (cat.categorie && cat.categorie.nom)
        || cat.nom
        || (typeof cat === "string" ? cat : "");

      document.getElementById("lightbox-content").innerHTML = `
        <img src="${url}" alt="${photo.titre}">
        <h3>${photo.titre}</h3>
        <p>${photo.descr || ""}</p>
        <p>${photo.format}, ${photo.width} x ${photo.height}</p>
        <h4>Catégorie : ${catName}</h4>
        <h4>Commentaires :</h4>
        <ul>
          ${(Array.isArray(coms.comments) ? coms.comments : []).map(c =>
            `<li><b>${c.pseudo}</b> : ${c.content}</li>`
          ).join("")}
        </ul>

      `;
    });

  });
}

document.getElementById("close-lightbox").onclick = function() {
  document.getElementById("lightbox").classList.remove("active");
  document.getElementById("lightbox").style.display = "none";
  document.querySelector("main").style.display = "";
};

document.getElementById("next-lightbox").onclick = function() {
  if (galleryIds.length > 0) {
    currentIndex = (currentIndex + 1) % galleryIds.length;
    showInLightbox(galleryIds[currentIndex]);
  }
};
document.getElementById("prev-lightbox").onclick = function() {
  if (galleryIds.length > 0) {
    currentIndex = (currentIndex - 1 + galleryIds.length) % galleryIds.length;
    showInLightbox(galleryIds[currentIndex]);
  }
};

document.addEventListener("keydown", function(e) {
  if (document.getElementById("lightbox").classList.contains("active")) {
    if (e.key === "Escape") document.getElementById("close-lightbox").click();
    if (e.key === "ArrowLeft") document.getElementById("prev-lightbox").click();
    if (e.key === "ArrowRight") document.getElementById("next-lightbox").click();
  }
});
