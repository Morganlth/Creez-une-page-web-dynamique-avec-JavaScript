//IMPORTS

import { modal } from '../modules/modal.js'

//CONSTANTES

const header = document.querySelector('header')

//EXPORT

export const load = {
    /*
    ? LOAD => chargement de code HTML
    */
    setFilter(filter)
    {
        filter.forEach(f => this.element.insertAdjacentHTML('beforeend', `<li><button data-action-id="${f.id}" type="button">${f.name}</button></li>`))
    }
,
    setGallery: (works) =>
    {
        const gallery = document.querySelector('#portfolio .gallery')

        gallery.innerHTML = ''

        getWorksWithModification(works).forEach(w => gallery.insertAdjacentHTML('beforeend',
        `<figure data-work-id="${w.id}"><img src="${w.imageUrl}" alt="${w.title}" crossorigin><figcaption>${w.title}</figcaption></figure>`))
    }
,
    setHeader: () =>
    {
        const headerHTML = getHeader()

        header.insertAdjacentHTML('afterbegin', headerHTML)
    }
,
    setEditAnchor: () => // UTILISATION DES ANCRES "js-anchor" DU HTML
    {
        document.querySelectorAll('.js-anchor').forEach(a => a.insertAdjacentHTML('beforeend', `<span class="js-edit">${getEditIcon('black')} modifier</span>`))
    }
,
    setModal: () =>
    {
        const modalHTML = getModal()

        document.querySelector('body').insertAdjacentHTML('afterbegin', modalHTML)
    }
,
    setModalGallery: (works) =>
    {
        const gallery = document.querySelector('#modal-remove>div'), binHTML = getBin()

        gallery.innerHTML = ''
    
        getWorksWithModification(works).forEach(w => gallery.insertAdjacentHTML('beforeend', `<div><img src="${w.imageUrl}" alt="${w.title}" crossorigin>
        <button data-btn-action="${w.id}" type="button">${binHTML}</button><span>éditer</span></div>`))

        return gallery
    }
,
    setImage: (url) =>
    {
        const container = document.querySelector('#modal-file-container')

        container.querySelector('div').classList.add('hidden')

        container.insertAdjacentHTML('afterbegin', `<img id="overview-image" src="${url}" alt=".">`)
    }
}

//CODE

function getWorksWithModification(works) // RÉCUPÈRE LES TRAVAUX SUPPRIMER ET AJOUTER PAR LA MODAL POUR AFFICHER UN RENDU VISUEL SUR LES FUTURS MODIFICATIONS
{
    works = works.filter(w => !modal.REMOVAL_WORKS.includes(w.id + ''))
    works.push(...modal.ADDITION_WORKS)

    return works
}

function getHeader()
{
    return `
        <div id="js-header" class="flex center js-module">
            ${getEditIcon('white')}
        
            <p>Mode édition</p>
            <button type="button">publier les changements</button>
        </div>
    `
}

function getEditIcon(color)
{
    return `
        <svg class="edit-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.90827 5.6194L7.0677 7.45996C6.3896 8.13807 5.70762 8.81617 5.03339 9.50203C4.87452 9.66477 4.7544 9.88177 4.7079 10.0949C4.46378 11.2147 4.22741 12.3346
            3.99104 13.4544L3.8593 14.0744C3.7973 14.3766 3.87867 14.6789 4.08404 14.8842C4.24291 15.0431 4.46378 15.1322 4.69627 15.1322C4.76214 15.1322 4.82802 15.1245 4.89389
            15.1129L5.57587 14.9695C6.66084 14.7409 7.74968 14.5084 8.83465 14.2836C9.08652 14.2294 9.29963 14.117 9.48175 13.9349C12.5274 10.8854 15.5731 7.8397 18.6187
            4.79792C18.8435 4.57318 18.9675 4.30581 18.9985 3.97645C19.0023 3.9222 18.9985 3.86795 18.9868 3.81758C18.9675 3.74008 18.952 3.65871 18.9326 3.58121C18.89 3.38359
            18.8435 3.15885 18.7505 2.94185C18.1809 1.63989 17.2354 0.709921 15.9412 0.186812C15.6816 0.0821901 15.4065 0.0473162 15.1662 0.0163172L15.1003 0.00856739C14.7516
            -0.0340563 14.4339 0.0821901 14.1587 0.361182C12.415 2.11263 10.6597 3.86795 8.90827 5.6194ZM14.9725 0.942414C14.9802 0.942414 14.9841 0.942414 14.9918 0.942414L15.0577
            0.950164C15.2592 0.973413 15.4452 0.996662 15.5924 1.05866C16.6464 1.4849 17.4214 2.24437 17.8903 3.31384C17.9445 3.43784 17.9794 3.59671 18.0142 3.76333C18.0259 3.82533
            18.0414 3.88732 18.053 3.94932C18.0375 4.01907 18.0104 4.06557 17.9561 4.11594C14.9066 7.15772 11.8609 10.2073 8.81527 13.2529C8.7649 13.3033 8.7184 13.3265 8.64865
            13.342C7.55981 13.5707 6.47484 13.7993 5.386 14.0279L4.81252 14.148L4.92102 13.6404C5.15738 12.5244 5.39375 11.4046 5.63399 10.2886C5.64174 10.2538 5.67274 10.1995
            5.70762 10.1608C6.38185 9.47878 7.05608 8.80067 7.73418 8.12644L9.57475 6.28588C11.3301 4.53055 13.0854 2.77523 14.8368 1.01604C14.9105 0.954039 14.9453 0.942414 14.9725
            0.942414Z" fill="${color}"/>
            <path d="M1.50733 4.22446H8.27287C8.53637 4.22446 8.74949 4.01134 8.74949 3.74785C8.74949 3.48436 8.53637 3.27124 8.27287 3.27124H1.50733C0.67423 3.27124 0 3.94934 0
            4.77857V17.4649C0 18.298 0.678105 18.9723 1.50733 18.9723H14.1898C15.0229 18.9723 15.6972 18.2942 15.6972 17.4649V10.9745C15.6972 10.711 15.484 10.4979 15.2205 10.4979C14.957
            10.4979 14.7439 10.711 14.7439 10.9745V17.4649C14.7439 17.7711 14.4921 18.0229 14.1859 18.0229H1.50733C1.20121 18.0229 0.949346 17.7711 0.949346 17.4649V4.78244C0.949346
            4.47633 1.20121 4.22446 1.50733 4.22446Z" fill="${color}"/>
        </svg>
    `
}

function getModal()
{
    return `
        <div id="js-modal-module" class="flex center js-module">
            <div>
                <nav>
                    <ul>
                        <li><a id="modal-back" class="hidden modal-toggle"><img src="./assets/icons/arrow_back.png"></a></li>
                        <li><a id="modal-close"><img src="./assets/icons/close.png"></a></li>
                    </ul>
                </nav>

                <section id="modal-remove">${getModalGallery()}</section>

                <section id="modal-add" class="hidden">${getModalForm()}</section>
            </div>
        </div>
    `
}

function getModalGallery()
{
    return `
        <h3>Galerie photo</h3>

        <div></div>

        <hr>

        <button class="active modal-toggle" type="button">Ajouter une photo</button>
        <a href="#">Supprimer la galerie</a>
    `
}

function getModalForm()
{
    return `
        <h3>Ajout photo</h3>

        <form class="flex" action="#" onsubmit="return false" enctype="multipart/form-data">
            <div id="modal-file-container">
                <div class="flex center">
                    <img id="modal-image-icon" src="./assets/icons/image.png">
        
                    <label for="modal-image" class="flex center">+ Ajouter photo</label>
                    <input id="modal-image" class="hidden" type="file" name="image">

                    <span>jpg, png : 4mo max</span>
                </div>
            </div>

            <div>
                <label for="modal-title">Titre</label>
                <input id="modal-title" type="text" name="title" required>
                <label for="modal-category">Catégorie</label>
                <select id="modal-category" required>
                    <option selected disabled></option>
                    <option value="1">Objets</option>
                    <option value="2">Appartements</option>
                    <option value="3">Hôtels & restaurants</option>
                </select>
            </div>

            <hr>

            <button type="submit">Valider</button>
        </form>
    `
}

function getBin()
{
    return `
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294
            9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4
            7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z"/>
        </svg>
    `
}