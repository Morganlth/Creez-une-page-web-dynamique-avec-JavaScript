//IMPORTS

import { modal } from './modal.js'

//CONSTANTES

const loginElement = document.getElementById('login')

//EXPORT

export const login = {
    /*
    ? login => connexion / déconnexion
    */
    set: () =>
    {
        setEvent()
        test()
    }
}

//CODE

function setEvent()
{
    loginElement.addEventListener('click', loginEvent)
}

function test()
{
    const userId = sessionStorage.getItem('userId'), token = sessionStorage.getItem('token')

    if (userId && token) // SI IL EXISTE UN USER ID ET UN TOKEN CONNEXION
    {
        modal.set() // SET LA MODAL POUR L'ÉDITION DU SITE

        update('109px', 'logout', true)
    }
}


function loginEvent(e) // ÉVËNEMENT DE L'ÉLÉMENT D'ID "login"
{
    if (loginElement.connected)
    {
        e.preventDefault()
        logout()
    }
}

function logout() // DÉCONNEXION
{
    document.getElementById('js-header').remove()
    document.querySelectorAll('.js-edit').forEach(e => e.remove())

    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('token')

    update('50px', 'login', false)
}

function update(size, text, connected)
{
    document.querySelector('header').style.marginTop = size

    loginElement.innerText = text
    loginElement.connected = connected
}