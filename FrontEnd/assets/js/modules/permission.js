//IMPORTS

import { bridge } from '../utils/bridge.js'

//CODE

/*
    ? permission => gestion du formulaire de connexion + set sessionStorage
*/

setEvent()

function setEvent()
{
    document.querySelector('#js-login-module button').addEventListener('click', submit)
}

function submit()
{
    const email = document.getElementById('login-email').value, password = document.getElementById('login-password').value

    if (!email || !password) return exception('Merci de renseigner tout les champs')

    bridge.postLogin(email, password).then(authorization)
}

function authorization(data)
{
    if (!data) return exception('Erreur dans l’identifiant ou le mot de passe') // ERREUR DU COUPLE IDENTIFIANT
    
    sessionStorage.setItem('userId', data.userId)
    sessionStorage.setItem('token', data.token)

    location.replace('../index.html') // RELOAD VERS INDEX.HTML => voir test() dans login.js
}

function exception(err)
{
    document.querySelector('#exception').innerText = err
}