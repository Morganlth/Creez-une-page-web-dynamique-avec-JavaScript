//IMPORTS

import { filter } from './filter.js'

import { bridge } from '../utils/bridge.js'
import { load } from '../utils/load.js'

//VARIABLES

var id = -1, imageUrl, file, title, category, btnSubmit

//EXPORT

export const modal = {
    /*
    ? modal => ajoute et supprime de facon dynamique des travaux / pour valider les opérations en bdd l'utilisateur selectionne le bouton "publier les changements"
    */
    set: () =>
    {
        load.setHeader()
        load.setEditAnchor()

        setEvent()
    }
,
    REMOVAL_WORKS: [] // TRAVAUX SUPPRIMER (STOCKER DANS UN TABLEAU AVANT SUPRESSION EN BDD voir => publish()) 
,
    ADDITION_WORKS: [] // TRAVAUX AJOUTER (STOCKER DANS UN TABLEAU AVANT AJOUT EN BDD voir => publish()) 
}

//CODE

function setEvent()
{
    document.querySelector('#js-header>button').addEventListener('click', publish)
    document.querySelector('#portfolio .js-edit').addEventListener('click', update)
}

function publish() //SUPPRESSION ET AJOUT EN BDD (appelée par le bouton "publier les changements")
{
    if (modal.REMOVAL_WORKS.length !== 0) bridge.deleteWork(modal.REMOVAL_WORKS.shift()).then(publish)
    else if (modal.ADDITION_WORKS.length !== 0) bridge.postWork(modal.ADDITION_WORKS.shift()).then(publish)
    else
    {
        reloadGallery(false)
        close()
    }
}

function update()
{
    load.setModal()
    setModalVar()
    setModalEvent()

    bridge.getWorks().then(setGallery)
}

function setModalVar()
{
    file = document.getElementById('modal-image')
    title = document.getElementById('modal-title')
    category = document.getElementById('modal-category')
    btnSubmit = document.querySelector('#modal-add button')
}

function setModalEvent()
{
    document.querySelectorAll('.modal-toggle').forEach(e => e.addEventListener('click', switchModal))
    document.getElementById('modal-close').addEventListener('click', close)
    document.querySelector('#modal-remove>a').addEventListener('click', removeAll)

    file.addEventListener('change', fileReader)
    title.addEventListener('keyup', checkAndGet)
    category.addEventListener('change', checkAndGet)
    btnSubmit.addEventListener('click', append)
}

function setGallery(works)
{
    const gallery = load.setModalGallery(works)

    gallery.querySelectorAll('[data-btn-action]').forEach(b => b.addEventListener('click', (e) => removeWork(e.currentTarget)))
}

function reloadGallery(reloadModalGallery) // PERMET UNE ACTUALISATION EN FOND POUR UN APPERCU DYNAMIQUE => utilise filter.js
{
    const id = parseInt(document.querySelector('#js-filter-module .active').getAttribute('data-action-id'))

    if (reloadModalGallery) bridge.getWorks().then(setGallery)

    filter.load(id)
}

function close()
{
    const modal = document.getElementById('js-modal-module')

    if (modal) document.getElementById('js-modal-module').remove()
}

function switchModal()
{
    const modalRemove = document.getElementById('modal-remove'), modalAdd = document.getElementById('modal-add'),
          back = document.getElementById('modal-back'), removeActive = modalAdd.className.includes('hidden')

    removeActive ? back.classList.remove('hidden') : back.classList.add('hidden')

    updateModal(...(removeActive ? [modalAdd, modalRemove] : [modalRemove, modalAdd]))
}

function updateModal(activated, disabled)
{
    activated.classList.remove('hidden')
    disabled.classList.add('hidden')
}

function removeAll()
{
    if (!confirm('Etes-vous certain de vouloir supprimer l\'ensemble de la galerie ?')) return

    const gallery = document.querySelector('#modal-remove>div')

    gallery.querySelectorAll('button').forEach(b => removeWork(b))

    close()
}

function removeWork(target)
{
    const id = target.getAttribute('data-btn-action'), work = Array.from(document.querySelectorAll('[data-work-id]')).filter(w => w.getAttribute('data-work-id') === id)[0]

    parseInt(id) < 0 ? deletionOfAnAdditionWork(parseInt(id)) : modal.REMOVAL_WORKS.push(id)
    if (work) work.remove()
    target.parentNode.remove()
}

function deletionOfAnAdditionWork(id)
{
    modal.ADDITION_WORKS = modal.ADDITION_WORKS.filter(w => w.id !== id)
}

function fileReader() // LIT UN FICHIER POUR L'AFICHER
{
    const _f = this.files[0], fileReader = new FileReader()

    fileReader.onload = () =>
    {
        imageUrl = fileReader.result

        load.setImage(imageUrl)
        checkAndGet()
    }

    fileReader.readAsDataURL(_f)
}

function checkAndGet() // VÉRIFIE SI TOUT LE FORMULAIRE EST COMPLÉTÉ & RETOURNE UN PSEUDO OBJET "WORK" => voir "append"
{
    const _f = file.files[0], _t = title.value, _c = category.value, args = !_f || !_t || !_c ? false : { imageUrl: imageUrl, image: _f, title: _t, category: _c }

    args ? btnSubmit.classList.add('active') : btnSubmit.classList.remove('active')

    return args
}

function append(e)
{
    const args = checkAndGet()

    if (!args) return
    else args.id = id--

    modal.ADDITION_WORKS.push(args)
    reloadGallery(true)
    e.preventDefault()
    resetForm()
}

function resetForm()
{
    document.getElementById('overview-image').remove()
    document.querySelector('#modal-file-container>div').classList.remove('hidden')

    file.value = ''
    title.value = ''
    category.value = ''
    btnSubmit.classList.remove('active')
}