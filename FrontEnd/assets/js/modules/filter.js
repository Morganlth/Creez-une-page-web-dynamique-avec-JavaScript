//IMPORTS

import { bridge } from '../utils/bridge.js'
import { load } from '../utils/load.js'

//EXPORT

export const filter = {
    /*
    ? filter => tri par catégorie
    */
    set: () =>
    {
        setVar()
        setBody()

        filter.load(0)
    }
,
    load: (id) => bridge.getWorks().then((data) => setWorks(id, data)) // UTILISER AUSSI PAR modal.js POUR AFFICHER LE CONTENU DE FACON DYNAMIQUE
}

//CODE

function setVar()
{
    filter.element = document.getElementById('js-filter-module')
}

function setBody()
{
    bridge.getCategories().then(finalize)
}


function finalize(data)
{
    load.setFilter.call(filter, data)
    setEventFilter()
}

function setEventFilter()
{
    filter.element.querySelectorAll('button').forEach(b => b.addEventListener('click', action))
}

function action(e)
{
    const target = e.currentTarget, id = parseInt(target.getAttribute('data-action-id'))

    filter.element.querySelector('.active').classList.remove('active')
    target.classList.add('active')

    filter.load(id)
}

function setWorks(id, works)
{
    const worksInThisCategory = id ? works.filter(w => w.categoryId === id) : works

    load.setGallery(worksInThisCategory)
}