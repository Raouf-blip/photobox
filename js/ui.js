const BASE = "https://webetu.iutnc.univ-lorraine.fr";

export function displayPicture(obj) {
  const p = obj.photo;
  const url = BASE + p.url.href;
  const src = document.getElementById("photo-template").innerHTML;
  const tpl = Handlebars.compile(src);
  document.getElementById("la_photo").innerHTML = tpl({
    url: url,
    titre: p.titre,
    description: p.descr,
    type_media: p.format,
    width: p.width,
    height: p.height
  });
}

export function displayCategory(cat) {
  document.getElementById("la_categorie").textContent = "Catégorie : " + (cat.nom || cat);
}

export function displayComments(coms) {
  const ul = document.getElementById("les_commentaires");
  ul.innerHTML = "";
  (Array.isArray(coms) ? coms : coms.comments || []).forEach(c =>
    ul.innerHTML += `<li>${c.pseudo} : ${c.contenu}</li>`
  );
}
