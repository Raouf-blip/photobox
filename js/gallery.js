import { loadResource } from './photoloader.js';

let g = null;

export function loadGallery(url = "/www/canals5/phox/api/photos/") {
  let u = url.startsWith("http") ? url : "https://webetu.iutnc.univ-lorraine.fr" + url;
  return loadResource(u).then(x => {
    g = x;
    return x;
  });
}

export function nextGallery() {
  if (g && g.links && g.links.next) {
    return loadGallery(g.links.next.href);
  }
  return Promise.reject();
}

export function prevGallery() {
  if (g && g.links && g.links.prev) {
    return loadGallery(g.links.prev.href);
  }
  return Promise.reject();
}

export function firstGallery() {
  if (g && g.links && g.links.first) {
    return loadGallery(g.links.first.href);
  }
  return Promise.reject();
}

export function lastGallery() {
  if (g && g.links && g.links.last) {
    return loadGallery(g.links.last.href);
  }
  return Promise.reject();
}
