import { firstGallery, lastGallery, loadGallery, nextGallery, prevGallery } from "./gallery.js";
import { displayGallery } from "./gallery_ui.js";

function initGallery() {
  loadGallery().then(displayGallery);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("load-gallery").onclick = initGallery;
  document.getElementById("gallery-next").onclick = () => nextGallery().then(displayGallery);
  document.getElementById("gallery-prev").onclick = () => prevGallery().then(displayGallery);
  document.getElementById("gallery-first").onclick = () => firstGallery().then(displayGallery);
  document.getElementById("gallery-last").onclick = () => lastGallery().then(displayGallery);
});
