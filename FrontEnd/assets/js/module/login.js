//IMPORTS

import { modal } from './modal.js'

import { bridge } from '../utils/bridge.js'
import { load } from '../utils/load.js'

//CONSTANTES

const loginElement = document.getElementById('login')

//EXPORT

export const login = {
    /*
    ? login => connexion / déconnexion
    */
    set: () =>
    {
        const userId = sessionStorage.getItem('userId'), token = sessionStorage.getItem('token')
    
        setEvent()

        if (userId && token) authorization({ userId: userId, token: token }) // SI IL EXISTE UN USER ID ET UN TOKEN CONNEXION AUTO
    }
}

//CODE

function setEvent()
{
    loginElement.addEventListener('click', loginEvent)
}


function loginEvent() // ÉVËNEMENT DE L'ÉLÉMENT D'ID "login"
{
    const active = !loginElement.active, connected = loginElement.connected

    if (connected) return logout() // PERMET DE BASCULER VERS UN BOUTON DE DÉCONNEXION

    active ? load.setLogin(setEventLogin) : load.setMain()

    loginElement.active = active
}

function logout() // DÉCONNEXION
{
    document.getElementById('js-header').remove()
    document.querySelectorAll('.js-edit').forEach(e => e.remove())

    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('token')

    update('50px', 'login', false)
}

function setEventLogin()
{
    document.querySelector('#js-login-module button').addEventListener('click', submit)
}

function submit()
{
    const email = document.getElementById('login-email').value, password = document.getElementById('login-password').value

    if (!email || !password) return exception('Merci de renseigner tout les champs')

    bridge.postLogin(email, password).then(authorization)
}

function exception(err)
{
    document.querySelector('#exception').innerText = err
}

function authorization(data)
{
    if (!data) return exception('Erreur dans l’identifiant ou le mot de passe') // ERREUR DU COUPLE IDENTIFIANT
    if (document.querySelector('main').className.includes('hidden')) loginEvent() // BASCULE VERS LE MAIN

    finalize(data)
}

function finalize(data)
{
    modal.set() // SET LA MODAL POUR L'ÉDITION DU SITE
    
    sessionStorage.setItem('userId', data.userId)
    sessionStorage.setItem('token', data.token)

    update('109px', 'logout', true)
}

function update(size, text, connected)
{
    document.querySelector('header').style.marginTop = size

    loginElement.innerText = text
    loginElement.connected = connected
}