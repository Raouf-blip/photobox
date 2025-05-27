import { API_BASE_URL } from './config.js';

export function loadPicture(id) {
  return fetch(`${API_BASE_URL}/photos/${id}`, { credentials: 'include' })
    .then(r => r.json());
}

export function loadResource(url) {
  if (url.startsWith('http')) {
    return fetch(url, { credentials: 'include' }).then(r => r.json());
  }
  return fetch('https://webetu.iutnc.univ-lorraine.fr' + url, { credentials: 'include' })
    .then(r => r.json());
}